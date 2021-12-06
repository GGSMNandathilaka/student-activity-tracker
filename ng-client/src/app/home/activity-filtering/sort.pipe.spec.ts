import {SortPipe} from './sort.pipe';

describe('SortPipe', () => {
  it('create an instance', () => {
    const pipe = new SortPipe();
    expect(pipe).toBeTruthy();
  });

  it('sort a name (first-name last-name) array in alphabetical order by last-name', () => {
    const pipe = new SortPipe();
    const originalNameArr = ["Student 0", "Student 1", "Student 2", "Student 10"];
    const sortedNameArr = ["Student 0", "Student 1", "Student 10", "Student 2"];

    expect(pipe.transform(originalNameArr)).toBe(sortedNameArr);
  });
});
