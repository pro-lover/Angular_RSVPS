import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PageQuery } from './shirtsize.actions';
import * as fromModel from './shirtsize.reducer';
import { State } from "./shirtsize.state";



export const selectCollectionState = createFeatureSelector<State>("shirtsizes");


export const selectById = (modelId:number) => createSelector(
	selectCollectionState,
	collectionState => collectionState.entities[modelId]
);


export const selectCollection = createSelector(
	selectCollectionState,
	fromModel.selectAll
);

export const collectionLoaded = createSelector(
	selectCollectionState,
	collectionState => collectionState.collectionLoaded
);



export const selectAdminPage = (modelId:number, page:PageQuery) => createSelector(
	selectCollection,
	allModels => {

		const start = page.pageIndex * page.pageSize,
			  end = start + page.pageSize;

		return allModels
			.filter(model => parseInt(model.id) === modelId)
			.slice(start, end);

	}

);


export const selectAdminLoading = createSelector(
	selectCollectionState,
	collectionState => collectionState.isLoading
);
