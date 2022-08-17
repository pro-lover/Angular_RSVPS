import { Travel } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<Travel> = createEntityAdapter<Travel>({
	selectId: (model:Travel) => model.id,
	sortComparer: (a: Travel, b: Travel): number =>
		b.created.toString().localeCompare(a.created.toString())
});

export interface State extends EntityState<Travel> {
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
