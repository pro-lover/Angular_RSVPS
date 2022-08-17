import { Office } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<Office> = createEntityAdapter<Office>({
	selectId: (model:Office) => model.id,
	sortComparer: (a: Office, b: Office): number =>
		a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<Office> {
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
