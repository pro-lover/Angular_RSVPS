import { Gender } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<Gender> = createEntityAdapter<Gender>({
	selectId: (model:Gender) => model.id,
	sortComparer: (a: Gender, b: Gender): number =>
		b.name.toString().localeCompare(a.name.toString())
});

export interface State extends EntityState<Gender> {
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
