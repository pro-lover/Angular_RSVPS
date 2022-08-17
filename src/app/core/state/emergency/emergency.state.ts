import { EmergencyContact } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<EmergencyContact> = createEntityAdapter<EmergencyContact>({
	selectId: (model:EmergencyContact) => model.id,
	sortComparer: (a: EmergencyContact, b: EmergencyContact): number =>
		b.created.toString().localeCompare(a.created.toString())
});

export interface State extends EntityState<EmergencyContact> {
	//collection: Position[];
	//selectedItem: Position | null;
	collectionLoaded?: boolean;
	isLoading?: boolean;
	error?: any;
}

export const initialState: State = featureAdapter.getInitialState(
	{
		//collection: [],
		//selectedItem: null,
		collectionLoaded: false,
		isLoading: false,
		error: null
	}
);
