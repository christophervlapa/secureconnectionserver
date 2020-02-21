import { Directive, OnInit, Input, EventEmitter, ElementRef, Inject } from '@angular/core';

@Directive({
	selector: '[blur]'
})

export class BlurDirective {

	@Input('blur') FocusEvent: EventEmitter<boolean>;

	constructor(@Inject(ElementRef) private element: ElementRef) {}

	ngOnInit(){
		this.FocusEvent.subscribe(event => {
			// this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);	
			this.element.nativeElement.blur();
			// console.log("EVENT ",this.element.nativeElement);
			// console.log("EVENT ",event);
		});
	}

}
