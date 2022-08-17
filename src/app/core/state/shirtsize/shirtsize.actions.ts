///
import { ShirtSize } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'ShirtSize';

export enum ShirtSizeActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_SHIRTSIZES	= '[ShirtSize API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[ShirtSize API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[ShirtSize API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[ShirtSize API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[ShirtSize API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[ShirtSize API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[ShirtSize API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[ShirtSize API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[ShirtSize API] Create Initiated',
	MODEL_CreateSuccess 		= '[ShirtSize API] Create Success',
	MODEL_CreateFailed 			= '[ShirtSize API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[ShirtSize API] Update Initiated',
	MODEL_UpdateSuccess 		= '[ShirtSize API] Update Success',
	MODEL_UpdateFailed 			= '[ShirtSize API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[ShirtSize API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[ShirtSize API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[ShirtSize API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[ShirtSize API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[ShirtSize API] Delete Success',
	MODEL_DeleteFailed 			= '[ShirtSize API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[ShirtSize API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[ShirtSize API] Restore Success',
	MODEL_RestoreFailed 		= '[ShirtSize API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = ShirtSizeActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = ShirtSizeActionTypes.appComponentInitialized;

}

export class COLLECTION_LOAD_SHIRTSIZES implements Action {

	readonly type = ShirtSizeActionTypes.COLLECTION_LOAD_SHIRTSIZES;

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = ShirtSizeActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: ShirtSize[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = ShirtSizeActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = ShirtSizeActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = ShirtSizeActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: ShirtSize }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = ShirtSizeActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: ShirtSize }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: ShirtSize }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: ShirtSize }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: ShirtSize }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<ShirtSize> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: ShirtSize  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: ShirtSize }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = ShirtSizeActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type ShirtSizeActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_SHIRTSIZES
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
