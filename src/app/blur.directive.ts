import { Directive, Input, EventEmitter, ElementRef, Inject } from '@angular/core';

@Directive({
	selector: '[blur]'
})

export class BlurDirective {

	@Input('blur') FocusEvent: EventEmitter<boolean>;

	constructor(@Inject(ElementRef) private element: ElementRef) {}

	ngOnInit(){
		this.FocusEvent.subscribe(event => {
			this.element.nativeElement.blur();
		});
	}

}
