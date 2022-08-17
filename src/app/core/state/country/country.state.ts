import { Country } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<Country> = createEntityAdapter<Country>({
	selectId: (model:Country) => model.id,
	sortComparer: (a: Country, b: Country): number =>
		a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<Country> {
	//collection: model[];
	//selectedItem: model | null;
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
