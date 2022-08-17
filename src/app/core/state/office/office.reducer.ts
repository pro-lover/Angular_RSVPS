import { OfficeActions, OfficeActionTypes } from './office.actions';
import { featureAdapter, State } from "./office.state";

const initialState = featureAdapter.getInitialState();

export function officeReducer(
	state = initialState,
	action: OfficeActions
): State {

	switch(action.type) {

		case OfficeActionTypes.COLLECTION_LOADED_SUCCESS:

			return featureAdapter.setAll(
				action.payload.collection,
				{...state,
					//collection: [],
					//selectedItem: null,
					isLoading: false,
					error: null,
					collectionLoaded:true
				}
			);

		case OfficeActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case OfficeActionTypes.MODEL_LoadedSuccess:

			//console.warn('action.type:', action.type);

			return featureAdapter.addOne(
				action.payload.dataItem,
				{
					...state,
					//collection: [],
					//selectedItem: null,
					isLoading: false,
					collectionLoaded:true,
					error: null
				  }
			);

		case OfficeActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case OfficeActionTypes.MODEL_UpdateSuccess:

			return featureAdapter.updateOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case OfficeActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case OfficeActionTypes.MODEL_LoadedFailed:
		case OfficeActionTypes.MODEL_UpdateFailed:
		case OfficeActionTypes.MODEL_UpdateStatusFailed:
		case OfficeActionTypes.MODEL_DeleteFailed:
		case OfficeActionTypes.MODEL_RestoreFailed:
		case OfficeActionTypes.MODEL_CreateFailed:
		case OfficeActionTypes.COLLECTION_LOADED_FAILED:

			console.error('FAILED REDUCER:', action.type, featureAdapter);

			return state;

		default: {

			//console.warn('DEFAULT REDUCER:', action.type, featureAdapter);

			return state;

			return {
				...state,
				//collection: [],
				//selectedItem: null,
				collectionLoaded:true,
				isLoading: false,
				error: null
			};
		}

	}
}

export const {
selectAll,
selectEntities,
selectIds,
selectTotal

} = featureAdapter.getSelectors();
