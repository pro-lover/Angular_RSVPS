///
import { Account } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'Account';

export enum AccountActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_ACCOUNTS	= '[Account API] Collection Initialised',
	COLLECTION_LOADED_INITIATED	= '[Account API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS	= '[Account API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED	= '[Account API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 		= '[Account API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[Account API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[Account API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[Account API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[Account API] Create Initiated',
	MODEL_CreateSuccess 		= '[Account API] Create Success',
	MODEL_CreateFailed 			= '[Account API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[Account API] Update Initiated',
	MODEL_UpdateSuccess 		= '[Account API] Update Success',
	MODEL_UpdateFailed 			= '[Account API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[Account API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[Account API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[Account API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[Account API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[Account API] Delete Success',
	MODEL_DeleteFailed 			= '[Account API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[Account API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[Account API] Restore Success',
	MODEL_RestoreFailed 		= '[Account API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = AccountActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = AccountActionTypes.appComponentInitialized;

}

export class COLLECTION_LOAD_ACCOUNTS implements Action {

	readonly type = AccountActionTypes.COLLECTION_LOAD_ACCOUNTS;

}

export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = AccountActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: Account[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = AccountActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = AccountActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = AccountActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: Account }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = AccountActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: Account }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = AccountActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = AccountActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: Account }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = AccountActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: Account }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = AccountActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = AccountActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: Account }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = AccountActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<Account> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = AccountActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = AccountActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = AccountActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: Account  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = AccountActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = AccountActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = AccountActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = AccountActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = AccountActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = AccountActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: Account }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = AccountActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type AccountActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_ACCOUNTS
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
