import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightRepos]',
  standalone: true,
})
export class HighlightReposDirective implements OnInit {
  @Input('appHighlightRepos') publicRepos!: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.publicRepos > 2) {
      this.el.nativeElement.style.color = 'red';
      this.el.nativeElement.style.fontWeight = 'bold';
    }
  }
}
