import { DelegateActions, DelegateActionTypes } from './delegate.actions';
import { featureAdapter, State } from "./delegate.state";

const initialState = featureAdapter.getInitialState();

export function delegateReducer(
	state = initialState,
	action: DelegateActions
): State {

	switch(action.type) {

		case DelegateActionTypes.COLLECTION_LOADED_SUCCESS:

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

		case DelegateActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case DelegateActionTypes.MODEL_LoadedSuccess:

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

		case DelegateActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case DelegateActionTypes.MODEL_UpdateSuccess:

			return featureAdapter.updateOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case DelegateActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case DelegateActionTypes.MODEL_LoadedFailed:
		case DelegateActionTypes.MODEL_UpdateFailed:
		case DelegateActionTypes.MODEL_UpdateStatusFailed:
		case DelegateActionTypes.MODEL_DeleteFailed:
		case DelegateActionTypes.MODEL_RestoreFailed:
		case DelegateActionTypes.MODEL_CreateFailed:
		case DelegateActionTypes.COLLECTION_LOADED_FAILED:

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
