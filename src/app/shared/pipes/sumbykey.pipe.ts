import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'sumByKey'
})
export class SumByKeyPipe implements PipeTransform {

	transform( key: string, data:any[] ): number {

		//console.log('sumByKey:', key, data);
		let sum = 0;
        for ( let i = data.length - 1; i >= 0; i-- ) {

        	//if( data[i][key] === false || data[i][key] == null ) {} else {
				if(  data[i].label == key ) {
					//sum += parseInt( data[i][key] );

					sum =  data[i].data.reduce((a:number, b:number) => a + b, 0);
				}
        		//sum += parseInt( data[i][key] );
        	//}
        }

        return sum;
	}

}
