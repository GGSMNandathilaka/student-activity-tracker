import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sortName'
})
export class SortPipe implements PipeTransform {

  transform(value: string[], ...args: any[]): string[] {
    return value.sort((a: string, b: string) => a.split(" ")[1] > b.split(" ")[1] ? 1 : -1)
  }

}
