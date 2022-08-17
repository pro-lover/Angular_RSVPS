import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diet } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/diet`;

@Injectable({ providedIn: 'root' })
export class DietService {
	private dietSubject: BehaviorSubject<Diet[]>;
	public diet: Observable<Diet[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.dietSubject = new BehaviorSubject<Diet[]>([]);
		this.diet = this.dietSubject.asObservable();
	}

	public get dietValue(): Diet[] {
		return this.dietSubject.value;
	}

	public getAll() {
		return this.http.get<Diet[]>(baseUrl)
				.pipe(map((modelCollection: Diet[]) => {
						// publish updated collection to subscribers
						this.dietSubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<Diet>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<Diet>(baseUrl, params)
			.pipe(map((model: Diet) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<Diet>(`${baseUrl}/${id}`, params)
			.pipe(map((model: Diet) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<Diet>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: Diet) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<Diet>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: Diet) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<Diet>(`${baseUrl}/${id}`)
			.pipe(map((model: Diet) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: Diet, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.dietValue !== null ) {
					const updatedObjs:Diet[] = [];
					this.dietValue.map((x: Diet) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.dietSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.dietValue !== null ) {

					const updatedObjs:Diet[] = [];
					this.dietValue.map((x:Diet) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.dietSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.dietValue !== null && deleteId !== undefined ) {

					const updatedObjs:Diet[] = [];
					this.dietValue.map((x:Diet) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.dietSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('diet');

	}
}
