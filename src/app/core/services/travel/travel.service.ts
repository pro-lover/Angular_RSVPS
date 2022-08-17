import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Travel } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/travel`;

@Injectable({ providedIn: 'root' })
export class TravelService {
	private travelSubject: BehaviorSubject<Travel[]>;
	public travel: Observable<Travel[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.travelSubject = new BehaviorSubject<Travel[]>([]);
		this.travel = this.travelSubject.asObservable();
	}

	public get travelValue(): Travel[] {
		return this.travelSubject.value;
	}

	public getAll() {
		return this.http.get<Travel[]>(baseUrl)
				.pipe(map((modelCollection: Travel[]) => {
						// publish updated collection to subscribers
						this.travelSubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<Travel>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<Travel>(baseUrl, params)
			.pipe(map((model: Travel) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<Travel>(`${baseUrl}/${id}`, params)
			.pipe(map((model: Travel) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<Travel>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: Travel) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<Travel>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: Travel) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<Travel>(`${baseUrl}/${id}`)
			.pipe(map((model: Travel) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: Travel, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.travelValue !== null ) {
					const updatedObjs:Travel[] = [];
					this.travelValue.map((x: Travel) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.travelSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.travelValue !== null ) {

					const updatedObjs:Travel[] = [];
					this.travelValue.map((x:Travel) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.travelSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.travelValue !== null && deleteId !== undefined ) {

					const updatedObjs:Travel[] = [];
					this.travelValue.map((x:Travel) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.travelSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('travel');

	}
}
