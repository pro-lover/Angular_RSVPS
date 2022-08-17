import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmergencyContact } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/emergency`;

@Injectable({ providedIn: 'root' })
export class EmergencyContactService {
	private emergencyContactSubject: BehaviorSubject<EmergencyContact[]>;
	public emergencyContact: Observable<EmergencyContact[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.emergencyContactSubject = new BehaviorSubject<EmergencyContact[]>([]);
		this.emergencyContact = this.emergencyContactSubject.asObservable();
	}

	public get emergencyContactValue(): EmergencyContact[] {
		return this.emergencyContactSubject.value;
	}

	public getAll() {
		return this.http.get<EmergencyContact[]>(baseUrl)
				.pipe(map((modelCollection: EmergencyContact[]) => {
						// publish updated collection to subscribers
						this.emergencyContactSubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<EmergencyContact>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<EmergencyContact>(baseUrl, params)
			.pipe(map((model: EmergencyContact) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<EmergencyContact>(`${baseUrl}/${id}`, params)
			.pipe(map((model: EmergencyContact) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<EmergencyContact>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: EmergencyContact) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<EmergencyContact>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: EmergencyContact) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<EmergencyContact>(`${baseUrl}/${id}`)
			.pipe(map((model: EmergencyContact) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: EmergencyContact, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.emergencyContactValue !== null ) {
					const updatedObjs:EmergencyContact[] = [];
					this.emergencyContactValue.map((x: EmergencyContact) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.emergencyContactSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.emergencyContactValue !== null ) {

					const updatedObjs:EmergencyContact[] = [];
					this.emergencyContactValue.map((x:EmergencyContact) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.emergencyContactSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.emergencyContactValue !== null && deleteId !== undefined ) {

					const updatedObjs:EmergencyContact[] = [];
					this.emergencyContactValue.map((x:EmergencyContact) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.emergencyContactSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('emergencies');

	}
}
