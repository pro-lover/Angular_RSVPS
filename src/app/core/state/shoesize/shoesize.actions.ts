///
import { ShoeSize } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'ShoeSize';

export enum ShoeSizeActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_SHOESIZES	= '[ShoeSize API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[ShoeSize API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[ShoeSize API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[ShoeSize API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[ShoeSize API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[ShoeSize API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[ShoeSize API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[ShoeSize API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[ShoeSize API] Create Initiated',
	MODEL_CreateSuccess 		= '[ShoeSize API] Create Success',
	MODEL_CreateFailed 			= '[ShoeSize API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[ShoeSize API] Update Initiated',
	MODEL_UpdateSuccess 		= '[ShoeSize API] Update Success',
	MODEL_UpdateFailed 			= '[ShoeSize API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[ShoeSize API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[ShoeSize API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[ShoeSize API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[ShoeSize API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[ShoeSize API] Delete Success',
	MODEL_DeleteFailed 			= '[ShoeSize API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[ShoeSize API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[ShoeSize API] Restore Success',
	MODEL_RestoreFailed 		= '[ShoeSize API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = ShoeSizeActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = ShoeSizeActionTypes.appComponentInitialized;

}

export class COLLECTION_LOAD_SHOESIZES implements Action {

	readonly type = ShoeSizeActionTypes.COLLECTION_LOAD_SHOESIZES;

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = ShoeSizeActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: ShoeSize[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = ShoeSizeActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = ShoeSizeActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = ShoeSizeActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: ShoeSize }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = ShoeSizeActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: ShoeSize }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: ShoeSize }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: ShoeSize }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: ShoeSize }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<ShoeSize> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: ShoeSize  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: ShoeSize }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = ShoeSizeActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type ShoeSizeActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_SHOESIZES
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
