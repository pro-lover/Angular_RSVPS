import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/gender`;

@Injectable({ providedIn: 'root' })
export class GenderService {

	private genderSubject: BehaviorSubject<Gender[]>;
	public gender: Observable<Gender[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.genderSubject = new BehaviorSubject<Gender[]>([]);
		this.gender = this.genderSubject.asObservable();
	}

	public get genderValue(): Gender[] {
		return this.genderSubject.value;
	}

	public getAll() {
		return this.http.get<Gender[]>(baseUrl)
				.pipe(map((modelCollection: Gender[]) => {
						// publish updated collection to subscribers
						this.genderSubject.next(modelCollection);
						return modelCollection;
					})
				);

	}

	public getById(id: string) {
		return this.http.get<Gender>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<Gender>(baseUrl, params)
			.pipe(map((model: Gender) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<Gender>(`${baseUrl}/${id}`, params)
			.pipe(map((model: Gender) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<Gender>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: Gender) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<Gender>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: Gender) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<Gender>(`${baseUrl}/${id}`)
			.pipe(map((model: Gender) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: Gender, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.genderValue !== null ) {
					const updatedObjs:Gender[] = [];
					this.genderValue.map((x: Gender) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.genderSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.genderValue !== null ) {

					const updatedObjs:Gender[] = [];
					this.genderValue.map((x:Gender) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.genderSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.genderValue !== null && deleteId !== undefined ) {

					const updatedObjs:Gender[] = [];
					this.genderValue.map((x:Gender) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.genderSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('genders');

	}
}
