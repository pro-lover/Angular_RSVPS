///
import { Travel } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'Travel';

export enum TravelActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_TRAVEL		= '[Travel API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[Travel API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[Travel API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[Travel API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[Travel API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[Travel API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[Travel API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[Travel API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[Travel API] Create Initiated',
	MODEL_CreateSuccess 		= '[Travel API] Create Success',
	MODEL_CreateFailed 			= '[Travel API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[Travel API] Update Initiated',
	MODEL_UpdateSuccess 		= '[Travel API] Update Success',
	MODEL_UpdateFailed 			= '[Travel API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[Travel API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[Travel API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[Travel API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[Travel API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[Travel API] Delete Success',
	MODEL_DeleteFailed 			= '[Travel API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[Travel API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[Travel API] Restore Success',
	MODEL_RestoreFailed 		= '[Travel API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = TravelActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = TravelActionTypes.appComponentInitialized;

}

export class COLLECTION_LOAD_TRAVEL implements Action {

	readonly type = TravelActionTypes.COLLECTION_LOAD_TRAVEL;

}

export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = TravelActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: Travel[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = TravelActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = TravelActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = TravelActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: Travel }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = TravelActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: Travel }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = TravelActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = TravelActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: Travel }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = TravelActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: Travel }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = TravelActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = TravelActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: Travel }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = TravelActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<Travel> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = TravelActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = TravelActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = TravelActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: Travel  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = TravelActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = TravelActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = TravelActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = TravelActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = TravelActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = TravelActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: Travel }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = TravelActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type TravelActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_TRAVEL
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
