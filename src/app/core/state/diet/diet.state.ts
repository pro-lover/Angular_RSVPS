import { Diet } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<Diet> = createEntityAdapter<Diet>({
	selectId: (model:Diet) => model.id,
	sortComparer: (a: Diet, b: Diet): number =>
		a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<Diet> {
	//collection: Diet[];
	//selectedItem: Diet | null;
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
