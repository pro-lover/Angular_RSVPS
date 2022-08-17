import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/countries`;

@Injectable({ providedIn: 'root' })
export class CountryService {
	private countrySubject: BehaviorSubject<Country[]>;
	public country: Observable<Country[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.countrySubject = new BehaviorSubject<Country[]>([]);
		this.country = this.countrySubject.asObservable();
	}

	public get countryValue(): Country[] {
		return this.countrySubject.value;
	}

	public getAll() {
		return this.http.get<Country[]>(baseUrl)
				.pipe(map((modelCollection: Country[]) => {
						// publish updated collection to subscribers
						this.countrySubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<Country>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<Country>(baseUrl, params)
			.pipe(map((model: Country) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<Country>(`${baseUrl}/${id}`, params)
			.pipe(map((model: Country) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<Country>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: Country) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<Country>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: Country) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<Country>(`${baseUrl}/${id}`)
			.pipe(map((model: Country) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: Country, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.countryValue !== null ) {
					const updatedObjs:Country[] = [];
					this.countryValue.map((x: Country) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.countrySubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.countryValue !== null ) {

					const updatedObjs:Country[] = [];
					this.countryValue.map((x:Country) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.countrySubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.countryValue !== null && deleteId !== undefined ) {

					const updatedObjs:Country[] = [];
					this.countryValue.map((x:Country) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.countrySubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('country');

	}
}
