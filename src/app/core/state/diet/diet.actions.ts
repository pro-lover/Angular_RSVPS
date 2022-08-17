///
import { Diet } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'Diet';

export enum DietActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_DIET		= '[Diet API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[Diet API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[Diet API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[Diet API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[Diet API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[Diet API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[Diet API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[Diet API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[Diet API] Create Initiated',
	MODEL_CreateSuccess 		= '[Diet API] Create Success',
	MODEL_CreateFailed 			= '[Diet API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[Diet API] Update Initiated',
	MODEL_UpdateSuccess 		= '[Diet API] Update Success',
	MODEL_UpdateFailed 			= '[Diet API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[Diet API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[Diet API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[Diet API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[Diet API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[Diet API] Delete Success',
	MODEL_DeleteFailed 			= '[Diet API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[Diet API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[Diet API] Restore Success',
	MODEL_RestoreFailed 		= '[Diet API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = DietActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = DietActionTypes.appComponentInitialized;

}

export class COLLECTION_LOAD_DIET implements Action {

	readonly type = DietActionTypes.COLLECTION_LOAD_DIET;

}

export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = DietActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: Diet[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = DietActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = DietActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = DietActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: Diet }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = DietActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: Diet }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = DietActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = DietActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: Diet }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = DietActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: Diet }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = DietActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = DietActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: Diet }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = DietActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<Diet> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = DietActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = DietActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = DietActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: Diet  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = DietActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = DietActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = DietActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = DietActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = DietActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = DietActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: Diet }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = DietActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type DietActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_DIET
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
