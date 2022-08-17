///
import { Country } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'Country';

export enum CountryActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_COUNTRIES	= '[Country API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[Country API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[Country API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[Country API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[Country API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[Country API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[Country API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[Country API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[Country API] Create Initiated',
	MODEL_CreateSuccess 		= '[Country API] Create Success',
	MODEL_CreateFailed 			= '[Country API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[Country API] Update Initiated',
	MODEL_UpdateSuccess 		= '[Country API] Update Success',
	MODEL_UpdateFailed 			= '[Country API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[Country API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[Country API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[Country API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[Country API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[Country API] Delete Success',
	MODEL_DeleteFailed 			= '[Country API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[Country API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[Country API] Restore Success',
	MODEL_RestoreFailed 		= '[Country API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = CountryActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = CountryActionTypes.appComponentInitialized;

}


export class COLLECTION_LOAD_COUNTRIES implements Action {

	readonly type = CountryActionTypes.COLLECTION_LOAD_COUNTRIES;

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = CountryActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: Country[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = CountryActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = CountryActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = CountryActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: Country }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = CountryActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: Country }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = CountryActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = CountryActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: Country }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = CountryActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: Country }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = CountryActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = CountryActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: Country }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = CountryActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<Country> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = CountryActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = CountryActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = CountryActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: Country  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = CountryActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = CountryActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = CountryActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = CountryActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = CountryActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = CountryActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: Country }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = CountryActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type CountryActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_COUNTRIES
	| COLLECTION_CLEAR_ALL
	| COLLECTION_LOADED_SUCCESS
	| COLLECTION_LOADED_FAILED
	| MODEL_LoadedInitiated
	| MODEL_LoadedSuccess
	| MODEL_LoadedFailed
	| MODEL_CreateInitiated
	| MODEL_CreateSuccess
	| MODEL_CreateFailed
	| MODEL_UpdateInitiated
	| MODEL_UpdateSuccess
	| MODEL_UpdateFailed
	| MODEL_UpdateStatusInitiated
	| MODEL_UpdateStatusSuccess
	| MODEL_UpdateStatusFailed
	| MODEL_DeleteInitiated
	| MODEL_DeleteSuccess
	| MODEL_DeleteFailed
	| MODEL_RestoreInitiated
	| MODEL_RestoreSuccess
	| MODEL_RestoreFailed;
