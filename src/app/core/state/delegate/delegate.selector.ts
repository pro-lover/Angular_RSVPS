import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PageQuery } from './delegate.actions';
import * as fromModel from './delegate.reducer';
import { State } from "./delegate.state";



export const selectCollectionState = createFeatureSelector<State>("delegates");

export const selectCollection = createSelector(
	selectCollectionState,
	fromModel.selectAll
);

export const selectById = (modelId:number) => createSelector(
	selectCollectionState,
	collectionState => collectionState.entities[modelId]
);

/** /
export const selectByTemplateId = (templateId:number) => createSelector(
	selectCollection,
	allModels => {

		return allModels
			.filter(model => model.templateId === templateId);

	}

);
/**/

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
