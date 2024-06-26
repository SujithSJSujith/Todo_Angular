import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCompleted]',
  standalone: true
})
export class CompletedDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.color = "red";
    this.el.nativeElement.style.textDecoration= "line-through";
  }

}
