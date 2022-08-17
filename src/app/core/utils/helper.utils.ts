
// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
export const groupBy = (xs:any[], key:string | number): any => {
	return xs.reduce(function(rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
}

export const getCartesianProduct = (a:any): any => {

	const cartesian:any = (objXarr:any) => {
			const 	names 		= Object.keys( objXarr ),
					len   		= names.length -1,
					resp:any  	= [];

			buildIn( {}, 0)

			return resp;

			function buildIn(obj:any, indx:any) {
				const key = names[indx];
				for (const val of objXarr[ key ] )
				{
					const oo = {...obj,[key]:val}
					if (indx < len )  buildIn(oo, indx +1)
					else resp.push( oo )
				}
			}
	}

	const c:any = cartesian(a);
	return c;

}

//https://stackoverflow.com/questions/44698967/requesting-blob-images-and-transforming-to-base64-with-fetch-api
export const urlContentToDataUri = (url:string): Promise<string | ArrayBuffer | null> => {
	return  fetch(url)
			.then( response => response.blob() )
			.then( blob => new Promise( callback =>{
				const reader = new FileReader() ;
				reader.onload = function(){ callback(this.result) } ;
				reader.readAsDataURL(blob) ;
			}) ) ;
}

// Public Domain/MIT
export const generateUUID = (): string => {
	let d = new Date().getTime();//Timestamp
	//Time in microseconds since page-load or 0 if unsupported
	let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		let r = Math.random() * 16;//random number between 0 and 16
		if(d > 0){//Use timestamp until depleted
			r = (d + r)%16 | 0;
			d = Math.floor(d/16);
		} else {//Use microseconds since page-load if supported
			r = (d2 + r)%16 | 0;
			d2 = Math.floor(d2/16);
		}
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
}

export const compare = (a: number | string | boolean, b: number | string | boolean, isAsc: boolean) : number => {
	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export const uniqueArray = (c:any ): any => {
	c.filter((value:any, index:number) => {
		const _value = JSON.stringify(value);
		return index === c.findIndex((obj:any) => {
			return JSON.stringify(obj) === _value;
		});
	});
}

export const getRandomArbitrary = (min:number, max:number) => {
	return Math.random() * (max - min) + min;
}

export const noSpecialCharactersandSpace = ( str:string ):string => {

	return str.replace(/[^\w]/gi, '_');
	//return str.replace(/[^A-Z0-9]+/ig, "_");

}

// Get Difference between two Arrays of Objects
export const getDifference = (array1:any, array2:any):any[] => {
	return array1.filter((object1:any) => {
		return !array2.some((object2:any) => {
			return object1.name === object2.name;
		});
	});
}

export const randomColor = ():string => {
	return Math.floor(Math.random()*16777215).toString(16);
}

// https://stackoverflow.com/questions/12168909/blob-from-dataurl
export const dataURItoBlob = (dataURI:string): Blob => {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	const byteString = atob(dataURI.split(',')[1]);

	// separate out the mime component
	const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

	// write the bytes of the string to an ArrayBuffer
	const ab = new ArrayBuffer(byteString.length);

	// create a view into the buffer
	const ia = new Uint8Array(ab);

	// set the bytes of the buffer to the correct values
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	// write the ArrayBuffer to a blob, and you're done
	const blob = new Blob([ab], {type: mimeString});
	return blob;

}

// https://www.sitepoint.com/delay-sleep-pause-wait/
export const sleep = ( milliseconds:number): void => {
	const date = Date.now();
	let currentDate = null;
	do {
	  currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

export const generateImageFromDataURI = ( imgDataURL:string ): Promise<HTMLImageElement> => {

	return new Promise(
		(resolve, reject) => {

			const img = new Image();

			img.addEventListener("load", () => {
				//console.log('Frame Image Loaded');

				resolve(img);

			});
			img.src = imgDataURL;

		}
	);

}

export const onlyUnique = (value:any, index:number, self:any) => {
	return self.indexOf(value) === index;
}
