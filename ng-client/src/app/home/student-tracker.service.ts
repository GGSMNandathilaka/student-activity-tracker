import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {ErrorHandlerService} from "../core/util/error-handler.service";
import {Activity} from "../core/model/api/activity";
import {TestClass} from "../core/model/api/test-class";
import {StudentAttempt} from "../core/model/ui/student-attempt";
import * as moment from 'moment';

@Injectable()
export class StudentTrackerService {

  private _activitiesEndpoint = environment.activitiesEndpoint;
  private _classesEndpoint = environment.classesEndpoint;

  // keep latest version of Student Attempts array
  private studentAttemptSubject: BehaviorSubject<StudentAttempt[]> = new BehaviorSubject<StudentAttempt[]>([]);
  private activitiesObs: Observable<Activity[]> = this.getActivities();
  private testClassesObs: Observable<TestClass[]> = this.getTestClasses();

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService) {
  }

  /**
   * Communicate with API and retrieve activities.
   * Processed API response to parse to a JSON object.
   */
  getActivities(): Observable<Activity[]> {
    return this.http.get(this._activitiesEndpoint)
      .pipe(
        map((res: any) => {
          if (res && res.body) {
            res = res.body
            return JSON.parse(res);
          }
        }),
        catchError(this.errorHandler.handleError('getActivities', []))
      );
  }

  /**
   * Communicate with API and retrieve classes
   */
  getTestClasses(): Observable<TestClass[]> {
    return this.http.get(this._classesEndpoint)
      .pipe(
        map((res: any) => {
          if (res) {
            return res;
          }
        }),
        catchError(this.errorHandler.handleError('getClasses', []))
      );
  }

  setStudentAttempts() {
    // merge observables using combineLatest RxJs operator
    if (this.activitiesObs && this.testClassesObs) {
      combineLatest([this.activitiesObs, this.testClassesObs]).subscribe(
        (([activities, testClasses]) => {

          // create a HashMap which contains unique students and which classes they belong to
          const studentClassMap: Map<string, number[]> = new Map();
          const testClassMap: Map<number, string> = new Map();

          if (testClasses && testClasses.length > 0) {
            testClasses.map(testClass => {

              if (testClass) {

                // create a student against classes-array Map
                if (testClass.students && testClass.students.length > 0) {
                  testClass.students.map(student => {
                    if (!studentClassMap.has(student)) {
                      studentClassMap.set(student, [testClass.id]);
                    } else {
                      if (studentClassMap.get(student)) {
                        studentClassMap.get(student)?.push(testClass.id);
                      }
                    }
                  });
                }

                // create a class id & name Map
                if (testClass.id && testClass.name) {
                  testClassMap.set(testClass.id, testClass.name);
                }

              }
            });
          }

          // flatten API response and create a view model
          const studentAttemptList: StudentAttempt[] = [];

          if (activities && activities.length > 0) {
            activities.map(activity => {
              if (activity && activity.attempts && activity.attempts.weeks && activity.attempts.weeks.length > 0 &&
                activity.attempts.values && activity.attempts.values.length > 0) {
                // Assumption: weeks array's record order is followed by the values array.
                // Here I have merged week & values array and create a flat array.

                activity.attempts.weeks.map((date, index) => {
                  let studentAttempt: StudentAttempt = new StudentAttempt();
                  const dateStr: string[] = date.split("/");

                  studentAttempt = {
                    ...activity,
                    attemptDate: moment(date, "DD/MM/YY").toDate(),
                    attemptScore: activity.attempts.values[index],
                    classIds: studentClassMap.get(activity.student)
                  }

                  studentAttemptList.push(studentAttempt);
                });
              }
            });
          }

          this.studentAttemptSubject.next(studentAttemptList);

        })
      );
    }
  }

  getStudentAttempts(): Observable<StudentAttempt[]> {
    return this.studentAttemptSubject;
  }


}
