import {
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Output
} from '@angular/core';

@Directive({
	selector: '[appClickTracking]',
})
export class ClickTrackingDirective {
	@Output() clickTrack = new EventEmitter<void>();

	constructor(private elementRef: ElementRef) {}

	//@HostListener('document:click', ['$event.target'])
	@HostListener('click', ['$event']) onClick($event: MouseEvent | any) {

		if( [null, undefined].includes($event) ) {} else {
			const location = $event.view.location ;
			const pathName = decodeURI(location.pathname);
			const innterHtml: string = this.elementRef.nativeElement.innerHTML;

			console.warn('TRACK UI EVENT:', pathName);
		}

		// send pathName and innterHtml to server.
		//    :

	}

	/** /
	onClick(target: HTMLElement): void {
		const clickedInside = this.elementRef.nativeElement.contains(target);

		if (!clickedInside) {
			this.clickTrack.emit();
		}
	}
	/**/
}
