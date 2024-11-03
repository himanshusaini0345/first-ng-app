import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]',
  standalone: true
})
export class HighlightCompletedTodoDirective {
  isCompleted = input(false)
  // constructor(private el: ElementRef) { }
  el = inject(ElementRef)
  stylesEffect = effect(() => {
    if (this.isCompleted()) {
      this.el.nativeElement.style.textDecoration = 'line-through';
    }
    else {
      this.el.nativeElement.style.textDecoration = 'none';
    }
  })
}
