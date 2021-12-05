import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[scoreHighlight]'
})
export class ScoreHighlightDirective {

  @Input('scoreHighlight') score: number;

  constructor(private el: ElementRef) {
    this.highlight(this.score)
  }

  private highlight(score: number) {
    switch (true) {
      case score < 60:
        this.el.nativeElement.style.backgroundColor = 'red';
        break;
      case score < 80:
        this.el.nativeElement.style.backgroundColor = 'yellow';
        break;
      case score < 90:
        this.el.nativeElement.style.backgroundColor = 'blue';
        break;
      case score < 100:
        this.el.nativeElement.style.backgroundColor = 'green';
        break;
      default:
        this.el.nativeElement.style.backgroundColor = 'violet';
    }


  }

}
