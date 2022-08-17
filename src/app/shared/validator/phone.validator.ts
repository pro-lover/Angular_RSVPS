import { FormGroup } from '@angular/forms';
// https://www.npmjs.com/package/libphonenumber-js
import { parsePhoneNumberWithError } from 'libphonenumber-js';

// custom validator to check that two fields match
export function phoneValidator(controlName: string) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName];
		//const matchingControl = formGroup.controls[matchingControlName];

		if (control.errors && !control.errors['phoneValidator']) {
			// return if another validator has already found an error on the matchingControl
			return;
		}

		if( [undefined, null, ''].includes(control.value)) {
			return;
		}

		try {

			const phoneNumber = parsePhoneNumberWithError(control.value);

			control.setErrors(null);
			control.patchValue( phoneNumber.formatInternational(), {emitEvent: false});

		} catch (error) {

			control.setErrors({ phoneValidator: true });

			/** /
			if (error instanceof ParseError) {
				// Not a phone number, non-existent country, etc.
				//console.log(error.message);

			} else {
				throw error
			}
			/**/
		}

		/** /
		// set error on matchingControl if validation fails
		if ( parsePhoneNumber(control.value).isValid() === false ) {
			control.setErrors({ phoneValidator: true });
		} else {
			control.setErrors(null);
			control.patchValue( parsePhoneNumber(control.value).formatInternational(), {emitEvent: false});
		}
		/**/
	}
}
