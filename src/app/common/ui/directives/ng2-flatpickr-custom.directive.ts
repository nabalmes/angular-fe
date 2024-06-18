import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[ng2-flatpickr-custom]'
})
export class Ng2FlatpickrCustomDirective {
  @Input('showError') showError:boolean;
  private shownError = false;
  private formControlErrorClass = 'is-invalid';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  checkError() {
    if (this.showError) {
      let input = this.el.nativeElement.querySelector('input.form-control');
      this.renderer.addClass(input, this.formControlErrorClass);
      this.shownError = true;
    } else {
      let input = this.el.nativeElement.querySelector('input.form-control');
      if (this.shownError) {
        this.renderer.removeClass(input, this.formControlErrorClass);
        this.shownError = false;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.checkError();
  }
}
