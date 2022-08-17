import { GenderActions, GenderActionTypes } from './genders.actions';
import { featureAdapter, State } from "./genders.state";

const initialState = featureAdapter.getInitialState();

export function gendersReducer(
	state = initialState,
	action: GenderActions
): State {

	switch(action.type) {

		case GenderActionTypes.COLLECTION_LOADED_SUCCESS:

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

		case GenderActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case GenderActionTypes.MODEL_LoadedSuccess:

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

		case GenderActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case GenderActionTypes.MODEL_UpdateSuccess:

			return featureAdapter.updateOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case GenderActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case GenderActionTypes.MODEL_LoadedFailed:
		case GenderActionTypes.MODEL_UpdateFailed:
		case GenderActionTypes.MODEL_UpdateStatusFailed:
		case GenderActionTypes.MODEL_DeleteFailed:
		case GenderActionTypes.MODEL_RestoreFailed:
		case GenderActionTypes.MODEL_CreateFailed:
		case GenderActionTypes.COLLECTION_LOADED_FAILED:

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
