import { Account } from '@app/core/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const featureAdapter: EntityAdapter<Account> = createEntityAdapter<Account>({
	selectId: (model:Account) => model.id,
	sortComparer: (a: Account, b: Account): number =>
		b.created.toString().localeCompare(a.created.toString())
});

export interface State extends EntityState<Account> {
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
