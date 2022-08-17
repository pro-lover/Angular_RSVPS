import { ShoeSizeActions, ShoeSizeActionTypes } from './shoesize.actions';
import { featureAdapter, State } from "./shoesize.state";

const initialState = featureAdapter.getInitialState();

export function shoesizeReducer(
	state = initialState,
	action: ShoeSizeActions
): State {

	switch(action.type) {

		case ShoeSizeActionTypes.COLLECTION_LOADED_SUCCESS:

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

		case ShoeSizeActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case ShoeSizeActionTypes.MODEL_LoadedSuccess:

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

		case ShoeSizeActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case ShoeSizeActionTypes.MODEL_UpdateSuccess:

			return featureAdapter.updateOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case ShoeSizeActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case ShoeSizeActionTypes.MODEL_LoadedFailed:
		case ShoeSizeActionTypes.MODEL_UpdateFailed:
		case ShoeSizeActionTypes.MODEL_UpdateStatusFailed:
		case ShoeSizeActionTypes.MODEL_DeleteFailed:
		case ShoeSizeActionTypes.MODEL_RestoreFailed:
		case ShoeSizeActionTypes.MODEL_CreateFailed:
		case ShoeSizeActionTypes.COLLECTION_LOADED_FAILED:

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
