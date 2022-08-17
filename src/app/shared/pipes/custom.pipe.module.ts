import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { AgePipe } from "@app/shared/pipes/age.pipe";
import { DateQuarterPipe } from "@app/shared/pipes/date.quarter.pipe";
import { HumanDateFormatPipe } from "@app/shared/pipes/humandate.pipe";
import { SumByKeyPipe } from "@app/shared/pipes/sumbykey.pipe";


@NgModule({
    declarations:[
        AgePipe,
		SumByKeyPipe,
		DateQuarterPipe,
		HumanDateFormatPipe
    ],
    imports:[
        CommonModule
    ],
    exports: [
        AgePipe,
		SumByKeyPipe,
		DateQuarterPipe,
		HumanDateFormatPipe
    ]
})

export class CustomPipeModule{}
