import { Delegate } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<Delegate> = createEntityAdapter<Delegate>({
	selectId: (model:Delegate) => model.id,
	sortComparer: (a: Delegate, b: Delegate): number =>
		b.created.toString().localeCompare(a.created.toString())
});

export interface State extends EntityState<Delegate> {
	//collection: Delegate[];
	//selectedItem: Delegate | null;
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
