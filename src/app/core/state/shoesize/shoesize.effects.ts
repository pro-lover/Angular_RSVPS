import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AlertService, ShoeSizeService } from "@core/services";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as ModelActions from "./shoesize.actions";

@Injectable()
export class ShoeSizeEffects {
	constructor(
		private router: Router,
		private location: Location,
		private actions$: Actions<any>,
		private apiService: ShoeSizeService,
		private alertService: AlertService
	) {}

	/** /
	init$ = createEffect(
		() => this.actions$.pipe(tap((action) => console.log(action))),
		{ dispatch: false }
	);
	/**/

	loadAll$ = createEffect(() =>
		this.actions$.pipe(
			ofType(
				ModelActions.ShoeSizeActionTypes.appComponentInitialized,
				ModelActions.ShoeSizeActionTypes.COLLECTION_LOAD_SHOESIZES
			),
			//tap((action) => console.log(action)),
			switchMap(() =>
				this.apiService.getAll().pipe(
					map(
						data => new ModelActions.COLLECTION_LOADED_SUCCESS({ collection: data })
					),
					catchError(error =>
						of(
							new ModelActions.COLLECTION_LOADED_FAILED({ error: error })
						)
					)
				)
			)
		)
	);

	addData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(
				ModelActions.ShoeSizeActionTypes.MODEL_CreateInitiated
			),
			switchMap((action) =>
				this.apiService.create(action.payload.dataItem).pipe(
					map(
						( newItem ) => new ModelActions.MODEL_CreateSuccess({ dataItem: newItem })
					),
					catchError((error) =>
						of(
							new ModelActions.MODEL_CreateFailed({ error: error })
						)
					)
				)
			)
		)
	);

	/**/
	editData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(
				ModelActions.ShoeSizeActionTypes.MODEL_UpdateInitiated
			),
			switchMap((action) =>
				this.apiService.update(action.payload.dataItem.id, action.payload.dataItem).pipe(
					map(( newItem:any ) =>
						new ModelActions.MODEL_UpdateSuccess({ dataItem: newItem })
					),
					catchError((error) =>
						of(
							new ModelActions.MODEL_UpdateFailed({ error: error })
						)
					)
				)
			)
		)
	);

	editStatus$ = createEffect(() =>
		this.actions$.pipe(
			ofType(
				ModelActions.ShoeSizeActionTypes.MODEL_UpdateStatusInitiated
			),
			switchMap((action) =>
				this.apiService.updateStatus(action.payload.dataId, action.payload.params).pipe(
					//tap(() => this.location.back()),
					map((dataItem:any) =>
						new ModelActions.MODEL_UpdateStatusSuccess({ dataItem: dataItem })
					),
					catchError((error) =>
						of(
							new ModelActions.MODEL_UpdateStatusFailed({ error: error })
						)
					)
				)
			)
		)
	);

	restoreData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(
				ModelActions.ShoeSizeActionTypes.MODEL_RestoreInitiated
			),
			switchMap((action) =>
				this.apiService.restore(action.payload.dataId).pipe(
					map((dataItem) =>
						new ModelActions.MODEL_RestoreSuccess({ dataItem: dataItem })
					),
					catchError((error) =>
						of(
							new ModelActions.MODEL_RestoreFailed({ error: error })
						)
					)
				)
			)
		)
	);

	deleteData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(
				ModelActions.ShoeSizeActionTypes.MODEL_DeleteInitiated
			),
			switchMap((action) =>
				this.apiService.delete(action.payload.dataId).pipe(
					map(() =>
						new ModelActions.MODEL_DeleteSuccess({ dataId: action.dataId })
					),
					catchError((error) =>
						of(
							new ModelActions.MODEL_DeleteFailed({ error: error })
						)
					)
				)
			)
		)
	);

	/** /
	readonly showErrorAlert$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(
					ModelActions.ShoeSizeActionTypes.MODEL_RestoreFailed,
					ModelActions.ShoeSizeActionTypes.MODEL_UpdateSuccess,
					ModelActions.ShoeSizeActionTypes.MODEL_UpdateStatusFailed,
					ModelActions.ShoeSizeActionTypes.MODEL_CreateFailed,
					//ModelActions.ShoeSizeActionTypes.COLLECTION_LOADED_FAILED,
					ModelActions.ShoeSizeActionTypes.MODEL_DeleteFailed
				),
				tap(
					({ error }) => this.alertService.error(error)
				)
			);
		},
		{ dispatch: false }
	);

	readonly showSuccessAlert$ = createEffect(
		() => {
			return this.actions$.pipe(
				ofType(
					ModelActions.ShoeSizeActionTypes.MODEL_RestoreSuccess,
					ModelActions.ShoeSizeActionTypes.MODEL_UpdateSuccess,
					ModelActions.ShoeSizeActionTypes.MODEL_UpdateStatusSuccess,
					ModelActions.ShoeSizeActionTypes.MODEL_CreateSuccess,
					ModelActions.ShoeSizeActionTypes.COLLECTION_LOADED_SUCCESS,
					ModelActions.ShoeSizeActionTypes.MODEL_DeleteSuccess
				),
				tap(
					({}) => this.alertService.success('Success')
				)
			);
		},
		{ dispatch: false }
	);
	/**/
}
