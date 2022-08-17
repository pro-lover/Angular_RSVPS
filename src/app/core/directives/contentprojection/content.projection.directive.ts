import {
	Directive, ElementRef, TemplateRef
} from '@angular/core';


@Directive({
	selector: '[appContentProjection]',
})
export class appContentProjectionDirective {

	//@HostBinding('attr.data-scope') contextScope!: string;
	//@HostBinding('class.fileover') fileOver: boolean | undefined;
	//@Output() fileDropped = new EventEmitter<any>();

	constructor(
		private elementRef: ElementRef,
		public templateRef: TemplateRef<unknown>
	) {
		//console.log('appContentProjectionDirective: ', this.contextScope);
	}
}
