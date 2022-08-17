///
import { Gender } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'Gender';

export enum GenderActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOADED_INITIATED	= '[Gender API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[Gender API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[Gender API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[Gender API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[Gender API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[Gender API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[Gender API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[Gender API] Create Initiated',
	MODEL_CreateSuccess 		= '[Gender API] Create Success',
	MODEL_CreateFailed 			= '[Gender API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[Gender API] Update Initiated',
	MODEL_UpdateSuccess 		= '[Gender API] Update Success',
	MODEL_UpdateFailed 			= '[Gender API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[Gender API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[Gender API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[Gender API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[Gender API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[Gender API] Delete Success',
	MODEL_DeleteFailed 			= '[Gender API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[Gender API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[Gender API] Restore Success',
	MODEL_RestoreFailed 		= '[Gender API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = GenderActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = GenderActionTypes.appComponentInitialized;

}

export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = GenderActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: Gender[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = GenderActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = GenderActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = GenderActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: Gender }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = GenderActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: Gender }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = GenderActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = GenderActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: Gender }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = GenderActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: Gender }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = GenderActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = GenderActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: Gender }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = GenderActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<Gender> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = GenderActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = GenderActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = GenderActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: Gender  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = GenderActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = GenderActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = GenderActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = GenderActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = GenderActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = GenderActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: Gender }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = GenderActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type GenderActions =
	appLoaded
	| appComponentInitialized
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
