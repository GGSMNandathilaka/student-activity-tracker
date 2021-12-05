import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[scoreHighlight]'
})
export class ScoreHighlightDirective implements AfterViewInit {

  @Input('scoreHighlight') score: number;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.highlight(this.score);
  }

  private highlight(score: number) {
    switch (true) {
      case score < 60:
        this.el.nativeElement.style.color = 'red';
        break;
      case score < 80:
        this.el.nativeElement.style.color = 'orange';
        break;
      case score < 90:
        this.el.nativeElement.style.color = 'gold';
        break;
      case score < 100:
        this.el.nativeElement.style.color = 'green';
        break;
      default:
        this.el.nativeElement.style.color = 'black';
    }


  }

}
