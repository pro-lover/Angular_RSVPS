import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShirtSize } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/shirtsize`;

@Injectable({ providedIn: 'root' })
export class ShirtSizeService {
	private shirtsizeSubject: BehaviorSubject<ShirtSize[]>;
	public shirtsize: Observable<ShirtSize[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.shirtsizeSubject = new BehaviorSubject<ShirtSize[]>([]);
		this.shirtsize = this.shirtsizeSubject.asObservable();
	}

	public get shirtsizeValue(): ShirtSize[] {
		return this.shirtsizeSubject.value;
	}

	public getAll() {
		return this.http.get<ShirtSize[]>(baseUrl)
				.pipe(map((modelCollection: ShirtSize[]) => {
						// publish updated collection to subscribers
						this.shirtsizeSubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<ShirtSize>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<ShirtSize>(baseUrl, params)
			.pipe(map((model: ShirtSize) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<ShirtSize>(`${baseUrl}/${id}`, params)
			.pipe(map((model: ShirtSize) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<ShirtSize>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: ShirtSize) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<ShirtSize>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: ShirtSize) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<ShirtSize>(`${baseUrl}/${id}`)
			.pipe(map((model: ShirtSize) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: ShirtSize, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.shirtsizeValue !== null ) {
					const updatedObjs:ShirtSize[] = [];
					this.shirtsizeValue.map((x: ShirtSize) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.shirtsizeSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.shirtsizeValue !== null ) {

					const updatedObjs:ShirtSize[] = [];
					this.shirtsizeValue.map((x:ShirtSize) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.shirtsizeSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.shirtsizeValue !== null && deleteId !== undefined ) {

					const updatedObjs:ShirtSize[] = [];
					this.shirtsizeValue.map((x:ShirtSize) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.shirtsizeSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('shirtsizes');

	}
}
