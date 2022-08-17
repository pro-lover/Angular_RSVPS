import { ShirtSizeActions, ShirtSizeActionTypes } from './shirtsize.actions';
import { featureAdapter, State } from "./shirtsize.state";

const initialState = featureAdapter.getInitialState();

export function shirtsizeReducer(
	state = initialState,
	action: ShirtSizeActions
): State {

	switch(action.type) {

		case ShirtSizeActionTypes.COLLECTION_LOADED_SUCCESS:

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

		case ShirtSizeActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case ShirtSizeActionTypes.MODEL_LoadedSuccess:

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

		case ShirtSizeActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case ShirtSizeActionTypes.MODEL_UpdateSuccess:

			return featureAdapter.updateOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case ShirtSizeActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case ShirtSizeActionTypes.MODEL_LoadedFailed:
		case ShirtSizeActionTypes.MODEL_UpdateFailed:
		case ShirtSizeActionTypes.MODEL_UpdateStatusFailed:
		case ShirtSizeActionTypes.MODEL_DeleteFailed:
		case ShirtSizeActionTypes.MODEL_RestoreFailed:
		case ShirtSizeActionTypes.MODEL_CreateFailed:
		case ShirtSizeActionTypes.COLLECTION_LOADED_FAILED:

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
