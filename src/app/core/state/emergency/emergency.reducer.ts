import { EmergencyContactActions, EmergencyContactActionTypes } from './emergency.actions';
import { featureAdapter, State } from "./emergency.state";

const initialState = featureAdapter.getInitialState();

export function emergencyReducer(
	state = initialState,
	action: EmergencyContactActions
): State {

	switch(action.type) {

		case EmergencyContactActionTypes.COLLECTION_LOADED_SUCCESS:

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

		case EmergencyContactActionTypes.COLLECTION_CLEAR_ALL:

			return featureAdapter.removeAll(state);

		case EmergencyContactActionTypes.MODEL_LoadedSuccess:

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

		case EmergencyContactActionTypes.MODEL_CreateSuccess:

			return featureAdapter.addOne(
				action.payload.dataItem,  {
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				  }
			);

		case EmergencyContactActionTypes.MODEL_UpdateSuccess:

			return featureAdapter.updateOne(
				action.payload.dataItem,
				{
					...state,
					collectionLoaded:true,
					isLoading: false,
					error: null
				}
			);

		case EmergencyContactActionTypes.MODEL_DeleteSuccess:

			return featureAdapter.removeOne(
				action.payload.dataId,
				{
					...state,
					allPositionsLoaded: true,
					isLoading: false,
					error: null
				}
			);

		case EmergencyContactActionTypes.MODEL_LoadedFailed:
		case EmergencyContactActionTypes.MODEL_UpdateFailed:
		case EmergencyContactActionTypes.MODEL_UpdateStatusFailed:
		case EmergencyContactActionTypes.MODEL_DeleteFailed:
		case EmergencyContactActionTypes.MODEL_RestoreFailed:
		case EmergencyContactActionTypes.MODEL_CreateFailed:
		case EmergencyContactActionTypes.COLLECTION_LOADED_FAILED:

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
