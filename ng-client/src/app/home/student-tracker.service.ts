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
import {FilterCriteria} from "../core/model/ui/filter-criteria";

@Injectable()
export class StudentTrackerService {

  private _activitiesEndpoint = environment.activitiesEndpoint;
  private _classesEndpoint = environment.classesEndpoint;

  // keep latest version of Student Attempts array
  // private studentAttemptSubject: BehaviorSubject<StudentAttempt[]> = new BehaviorSubject<StudentAttempt[]>([]);

  private activitiesObs: Observable<Activity[]> = this.getActivities();
  private testClassesObs: Observable<TestClass[]> = this.getTestClasses();
  private testClassMap: Map<number, string> = new Map();
  private studentClassMap: Map<string, number[]> = new Map();

  public filterObs: BehaviorSubject<FilterCriteria> = new BehaviorSubject<FilterCriteria>(new FilterCriteria());
  public studentAttemptObs: Observable<StudentAttempt[]> = this.setStudentAttempts();
  public chartDataObs: Observable<any> = this.setChartData();
  public studentClassMapSubject: BehaviorSubject<Map<string, number[]>> = new BehaviorSubject(new Map());

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
            // create a HashMap which contains unique students and which classes they belong to
            this.studentClassMap = new Map();
            this.testClassMap = new Map();

            this.setTestClassesMap(res);

            return res;
          }
        }),
        catchError(this.errorHandler.handleError('getClasses', []))
      );
  }

  setStudentAttempts(): Observable<StudentAttempt[]> {
    // merge observables using combineLatest RxJs operator
    return combineLatest([this.activitiesObs, this.testClassesObs, this.filterObs]).pipe(
      map((([activities, testClasses, filterCriteria]) => {

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

                  // filter logic runs here
                  if (filterCriteria.classId !== undefined || filterCriteria.student || filterCriteria.fromDate || filterCriteria.toDate) {

                    // class filter
                    if ('' + filterCriteria.classId) {
                      const classIds: number[] = this.studentClassMap.get(activity.student) || [];
                      if (!classIds.includes(+filterCriteria.classId)) {
                        return;
                      }
                    }

                    // student filter
                    if (filterCriteria.student) {
                      if (activity.student !== filterCriteria.student) {
                        return;
                      }
                    }

                    // from date filter
                    if (filterCriteria.fromDate) {
                      if (moment(date, "DD/MM/YY").toDate() < moment(filterCriteria.fromDate, "YYYY/MM/DD").toDate()) {
                        return;
                      }
                    }

                    // to date filter
                    if (filterCriteria.toDate) {
                      if (moment(date, "DD/MM/YY").toDate() > moment(filterCriteria.toDate, "YYYY/MM/DD").toDate()) {
                        return;
                      }
                    }

                  }

                  studentAttempt = {
                    ...activity,
                    attemptDate: moment(date, "DD/MM/YY").toDate(),
                    attemptScore: activity.attempts.values[index],
                    classIds: this.studentClassMap.get(activity.student)
                  }
                  studentAttemptList.push(studentAttempt);
                });
              }
            });
          }

          return studentAttemptList;

        })
      )
    );
  }

  setChartData() {
    return this.studentAttemptObs.pipe(
      map((data: StudentAttempt[]) => {
        if (data) {
          return data.reduce((previous, current) => {
            if (current.attemptScore < 60) {
              previous['weak']++
            } else if (current.attemptScore < 80) {
              previous['ok']++
            } else if (current.attemptScore < 90) {
              previous['good']++
            } else if (current.attemptScore < 100) {
              previous['excellent']++
            }

            previous['total']++
            return previous;
          }, {
            excellent: 0,
            good: 0,
            ok: 0,
            weak: 0,
            total: 0
          });
        }
      })
    );
  }

  /*getStudentAttempts(): Observable<StudentAttempt[]> {
    return this.studentAttemptSubject;
  }*/

  getTestClassMap(): Map<number, string> {
    return this.testClassMap;
  }

  getStudentClassMap(): Map<string, number[]> {
    return this.studentClassMap;
  }

  /**
   * Create testClass Map & student-testClass Map
   * @param testClasses
   */
  setTestClassesMap(testClasses: TestClass[]) {
    if (testClasses && testClasses.length > 0) {
      testClasses.map(testClass => {

        if (testClass) {

          // create a student against classes-array Map
          if (testClass.students && testClass.students.length > 0) {
            testClass.students.map(student => {
              if (!this.studentClassMap.has(student)) {
                this.studentClassMap.set(student, [testClass.id]);
              } else {
                if (this.studentClassMap.get(student)) {
                  this.studentClassMap.get(student)?.push(testClass.id);
                }
              }
            });
          }

          this.studentClassMapSubject.next(this.studentClassMap);


          // create a class id & name Map
          if (testClass.id && testClass.name) {
            this.testClassMap.set(testClass.id, testClass.name);
          }

        }
      });
    }

  }


}
