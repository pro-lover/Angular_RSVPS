import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
    name: 'HumanDateFormatPipe'
})

export class HumanDateFormatPipe implements PipeTransform {
	transform(value: Date ) {

		//if( [null, undefined].includes(value) ) return;
		if( value !== null ) {

			const date = new Date(value);

			return moment(date).fromNow();

		} else {
			return false;
		}
	}
}
