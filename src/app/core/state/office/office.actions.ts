///
import { Office } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'Office';

export enum OfficeActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_OFFICES		= '[Office API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[Office API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[Office API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[Office API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[Office API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[Office API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[Office API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[Office API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[Office API] Create Initiated',
	MODEL_CreateSuccess 		= '[Office API] Create Success',
	MODEL_CreateFailed 			= '[Office API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[Office API] Update Initiated',
	MODEL_UpdateSuccess 		= '[Office API] Update Success',
	MODEL_UpdateFailed 			= '[Office API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[Office API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[Office API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[Office API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[Office API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[Office API] Delete Success',
	MODEL_DeleteFailed 			= '[Office API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[Office API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[Office API] Restore Success',
	MODEL_RestoreFailed 		= '[Office API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = OfficeActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = OfficeActionTypes.appComponentInitialized;

}

export class COLLECTION_LOAD_OFFICES implements Action {

	readonly type = OfficeActionTypes.COLLECTION_LOAD_OFFICES;

}

export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = OfficeActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: Office[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = OfficeActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = OfficeActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = OfficeActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: Office }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = OfficeActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: Office }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = OfficeActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = OfficeActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: Office }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = OfficeActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: Office }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = OfficeActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = OfficeActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: Office }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = OfficeActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<Office> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = OfficeActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = OfficeActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = OfficeActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: Office  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = OfficeActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = OfficeActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = OfficeActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = OfficeActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = OfficeActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = OfficeActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: Office }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = OfficeActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type OfficeActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_OFFICES
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
