import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Office } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/office`;

@Injectable({ providedIn: 'root' })
export class OfficeService {
	private officeSubject: BehaviorSubject<Office[]>;
	public office: Observable<Office[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.officeSubject = new BehaviorSubject<Office[]>([]);
		this.office = this.officeSubject.asObservable();
	}

	public get officeValue(): Office[] {
		return this.officeSubject.value;
	}

	public getAll() {
		if( this.officeValue !== null && this.officeValue.length > 0 ) {

			//console.warn('Collection initialised in service:', this.officeValue);
			return this.officeSubject;

		} else {
			return this.http.get<Office[]>(baseUrl)
				.pipe(map((modelCollection: Office[]) => {
						// publish updated collection to subscribers
						this.officeSubject.next(modelCollection);
						return modelCollection;
					})
				);
		}
	}

	public getById(id: string) {
		return this.http.get<Office>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<Office>(baseUrl, params)
			.pipe(map((model: Office) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<Office>(`${baseUrl}/${id}`, params)
			.pipe(map((model: Office) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<Office>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: Office) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<Office>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: Office) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<Office>(`${baseUrl}/${id}`)
			.pipe(map((model: Office) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: Office, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.officeValue !== null ) {
					const updatedObjs:Office[] = [];
					this.officeValue.map((x: Office) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.officeSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.officeValue !== null ) {

					const updatedObjs:Office[] = [];
					this.officeValue.map((x:Office) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.officeSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.officeValue !== null && deleteId !== undefined ) {

					const updatedObjs:Office[] = [];
					this.officeValue.map((x:Office) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.officeSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('office');

	}
}
