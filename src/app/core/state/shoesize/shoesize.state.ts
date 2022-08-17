import { ShoeSize } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<ShoeSize> = createEntityAdapter<ShoeSize>({
	selectId: (model:ShoeSize) => model.id,
	sortComparer: (a: ShoeSize, b: ShoeSize): number =>
		b.created.toString().localeCompare(a.created.toString())
});

export interface State extends EntityState<ShoeSize> {
	//collection: ShoeSize[];
	//selectedItem: ShoeSize | null;
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
