import { ShirtSize } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<ShirtSize> = createEntityAdapter<ShirtSize>({
	selectId: (model:ShirtSize) => model.id,
	sortComparer: (a: ShirtSize, b: ShirtSize): number =>
		a.name.toString().localeCompare(b.name.toString())
});

export interface State extends EntityState<ShirtSize> {
	//collection: ShirtSize[];
	//selectedItem: ShirtSize | null;
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
