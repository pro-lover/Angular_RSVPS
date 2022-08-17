///
import { Delegate } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'Delegate';

export enum DelegateActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_DELEGATES	= '[Delegate API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[Delegate API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[Delegate API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[Delegate API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[Delegate API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[Delegate API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[Delegate API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[Delegate API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[Delegate API] Create Initiated',
	MODEL_CreateSuccess 		= '[Delegate API] Create Success',
	MODEL_CreateFailed 			= '[Delegate API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[Delegate API] Update Initiated',
	MODEL_UpdateSuccess 		= '[Delegate API] Update Success',
	MODEL_UpdateFailed 			= '[Delegate API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[Delegate API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[Delegate API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[Delegate API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[Delegate API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[Delegate API] Delete Success',
	MODEL_DeleteFailed 			= '[Delegate API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[Delegate API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[Delegate API] Restore Success',
	MODEL_RestoreFailed 		= '[Delegate API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = DelegateActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = DelegateActionTypes.appComponentInitialized;

}

export class COLLECTION_LOAD_DELEGATES implements Action {

	readonly type = DelegateActionTypes.COLLECTION_LOAD_DELEGATES;

}

export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = DelegateActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: Delegate[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = DelegateActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = DelegateActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = DelegateActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: Delegate }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = DelegateActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: Delegate }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = DelegateActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = DelegateActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: Delegate }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = DelegateActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: Delegate }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = DelegateActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = DelegateActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: Delegate }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = DelegateActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<Delegate> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = DelegateActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = DelegateActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = DelegateActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: Delegate  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = DelegateActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = DelegateActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = DelegateActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = DelegateActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = DelegateActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = DelegateActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: Delegate }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = DelegateActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type DelegateActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_DELEGATES
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
