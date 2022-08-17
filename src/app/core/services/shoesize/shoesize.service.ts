import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoeSize } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/shoesize`;

@Injectable({ providedIn: 'root' })
export class ShoeSizeService {
	private shoesizeSubject: BehaviorSubject<ShoeSize[]>;
	public shoesize: Observable<ShoeSize[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.shoesizeSubject = new BehaviorSubject<ShoeSize[]>([]);
		this.shoesize = this.shoesizeSubject.asObservable();
	}

	public get shoesizeValue(): ShoeSize[] {
		return this.shoesizeSubject.value;
	}

	public getAll() {
		return this.http.get<ShoeSize[]>(baseUrl)
				.pipe(map((modelCollection: ShoeSize[]) => {
						// publish updated collection to subscribers
						this.shoesizeSubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<ShoeSize>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<ShoeSize>(baseUrl, params)
			.pipe(map((model: ShoeSize) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<ShoeSize>(`${baseUrl}/${id}`, params)
			.pipe(map((model: ShoeSize) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<ShoeSize>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: ShoeSize) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<ShoeSize>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: ShoeSize) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<ShoeSize>(`${baseUrl}/${id}`)
			.pipe(map((model: ShoeSize) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: ShoeSize, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.shoesizeValue !== null ) {
					const updatedObjs:ShoeSize[] = [];
					this.shoesizeValue.map((x: ShoeSize) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.shoesizeSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.shoesizeValue !== null ) {

					const updatedObjs:ShoeSize[] = [];
					this.shoesizeValue.map((x:ShoeSize) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.shoesizeSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.shoesizeValue !== null && deleteId !== undefined ) {

					const updatedObjs:ShoeSize[] = [];
					this.shoesizeValue.map((x:ShoeSize) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.shoesizeSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('shoesizes');

	}
}
