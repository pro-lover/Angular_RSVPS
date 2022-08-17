///
import { EmergencyContact } from '@app/core/models';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

const modelName = 'EmergencyContact';

export enum EmergencyContactActionTypes {
	appLoaded 					= '[App] App Loaded',
	appComponentInitialized 	= '[Page] Component Initialised',
	//
	COLLECTION_LOAD_EMERGENCYCONTACTS	= '[EmergencyContact API] Collection Initialised',
	COLLECTION_LOADED_INITIATED			= '[EmergencyContact API] Collection Loaded',
	COLLECTION_LOADED_SUCCESS			= '[EmergencyContact API] Collection Loaded Success',
	COLLECTION_LOADED_FAILED			= '[EmergencyContact API] Collection Loaded Failed',
	COLLECTION_CLEAR_ALL 				= '[EmergencyContact API] Collection Cleared',
	//
	MODEL_LoadedInitiated		= '[EmergencyContact API] Model Load Initiated',
	MODEL_LoadedSuccess 		= '[EmergencyContact API] Model Loaded Success',
	MODEL_LoadedFailed 			= '[EmergencyContact API] Model Loaded Failed',
	// CREATE
	MODEL_CreateInitiated 		= '[EmergencyContact API] Create Initiated',
	MODEL_CreateSuccess 		= '[EmergencyContact API] Create Success',
	MODEL_CreateFailed 			= '[EmergencyContact API] Create Failed',
	// UPDATE
	MODEL_UpdateInitiated 		= '[EmergencyContact API] Update Initiated',
	MODEL_UpdateSuccess 		= '[EmergencyContact API] Update Success',
	MODEL_UpdateFailed 			= '[EmergencyContact API] Update Failed',
	// UPDATE_STATUS
	MODEL_UpdateStatusInitiated = '[EmergencyContact API] Status Saved',
	MODEL_UpdateStatusSuccess 	= '[EmergencyContact API] Status update Success',
	MODEL_UpdateStatusFailed 	= '[EmergencyContact API] Status update Failed',
	// DELETE
	MODEL_DeleteInitiated 		= '[EmergencyContact API] Delete Initiated',
	MODEL_DeleteSuccess 		= '[EmergencyContact API] Delete Success',
	MODEL_DeleteFailed 			= '[EmergencyContact API] Delete Failed',
	// RESTORE
	MODEL_RestoreInitiated	 	= '[EmergencyContact API] Restore Initiated',
	MODEL_RestoreSuccess 		= '[EmergencyContact API] Restore Success',
	MODEL_RestoreFailed 		= '[EmergencyContact API] Restore Failed'
}

export interface PageQuery {
	pageIndex: number;
	pageSize:number;
}


export class appLoaded implements Action {

	readonly type = EmergencyContactActionTypes.appLoaded;

}

export class appComponentInitialized implements Action {

	readonly type = EmergencyContactActionTypes.appComponentInitialized;

}

export class COLLECTION_LOAD_EMERGENCYCONTACTS implements Action {

	readonly type = EmergencyContactActionTypes.COLLECTION_LOAD_EMERGENCYCONTACTS;

}


export class COLLECTION_LOADED_SUCCESS implements Action {

	readonly type = EmergencyContactActionTypes.COLLECTION_LOADED_SUCCESS;

	constructor(public payload: { collection: EmergencyContact[] }) {

	}

}

export class COLLECTION_LOADED_FAILED implements Action {
	readonly type = EmergencyContactActionTypes.COLLECTION_LOADED_FAILED;

	constructor(public payload: { error: string  }) {}
}

export class COLLECTION_CLEAR_ALL implements Action {
	readonly type = EmergencyContactActionTypes.COLLECTION_CLEAR_ALL;

	constructor(public payload: { error: string  }) {}
}


export class MODEL_LoadedInitiated implements Action {

	readonly type = EmergencyContactActionTypes.MODEL_LoadedInitiated;

	constructor(public payload: { dataItem: EmergencyContact }) {}
}

export class MODEL_LoadedSuccess implements Action {

	readonly type = EmergencyContactActionTypes.MODEL_LoadedSuccess;

	constructor(public payload: { dataItem: EmergencyContact }) {

	}

}

export class MODEL_LoadedFailed implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_LoadedFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_CreateInitiated implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_CreateInitiated;

	constructor(public payload: { dataItem: EmergencyContact }) {}
}

export class MODEL_CreateSuccess implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_CreateSuccess;

	constructor(public payload: { dataItem: EmergencyContact }) {}
}

export class MODEL_CreateFailed implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_CreateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateInitiated implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_UpdateInitiated;

	constructor(public payload: { dataItem: EmergencyContact }) {}
}

export class MODEL_UpdateSuccess implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_UpdateSuccess;

	constructor(public payload: { dataItem: Update<EmergencyContact> }) {}
}

export class MODEL_UpdateFailed implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_UpdateFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_UpdateStatusInitiated implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_UpdateStatusInitiated;

	constructor(
		public payload: {
			dataId: number | string,
			params: any
		}
	) {}
}

export class MODEL_UpdateStatusSuccess implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_UpdateStatusSuccess;

	constructor(public payload: { dataItem: EmergencyContact  }) {}
}

export class MODEL_UpdateStatusFailed implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_UpdateStatusFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_DeleteInitiated implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_DeleteInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_DeleteSuccess implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_DeleteSuccess;

	constructor(public payload: { dataId: string  }) {}
}

export class MODEL_DeleteFailed implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_DeleteFailed;

	constructor(public payload: { error: string  }) {}
}

export class MODEL_RestoreInitiated implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_RestoreInitiated;

	constructor(public payload: { dataId: number | string }) {}
}

export class MODEL_RestoreSuccess implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_RestoreSuccess;

	constructor(public payload: { dataItem: EmergencyContact }) {}
}

export class MODEL_RestoreFailed implements Action {
	readonly type = EmergencyContactActionTypes.MODEL_RestoreFailed;

	constructor(public payload: { error: string  }) {}
}


export type EmergencyContactActions =
	appLoaded
	| appComponentInitialized
	| COLLECTION_LOAD_EMERGENCYCONTACTS
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
