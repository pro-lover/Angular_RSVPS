import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delegate } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/delegates`;

@Injectable({ providedIn: 'root' })
export class DelegateService {
	private delegateSubject: BehaviorSubject<Delegate[]>;
	public delegate: Observable<Delegate[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.delegateSubject = new BehaviorSubject<Delegate[]>([]);
		this.delegate = this.delegateSubject.asObservable();
	}

	public get delegateValue(): Delegate[] {
		return this.delegateSubject.value;
	}

	public getAll() {
		return this.http.get<Delegate[]>(baseUrl)
				.pipe(map((modelCollection: Delegate[]) => {
						// publish updated collection to subscribers
						this.delegateSubject.next(modelCollection);
						return modelCollection;
					})
				);
	}

	public getById(id: string) {
		return this.http.get<Delegate>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<Delegate>(baseUrl, params)
			.pipe(map((model: Delegate) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

    public update(id:string, params: any) {
		return this.http.put<Delegate>(`${baseUrl}/${id}`, params)
			.pipe(map((model: Delegate) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<Delegate>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: Delegate) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<Delegate>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: Delegate) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<Delegate>(`${baseUrl}/${id}`)
			.pipe(map((model: Delegate) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

	//
	public sendReminder(params: any) {
		return this.http.post<Delegate>(`${baseUrl}/send-reminder`, params)
			.pipe(map((model: Delegate) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public sendConfirmation(params: any) {
		return this.http.post<Delegate>(`${baseUrl}/send-confirmation`, params)
			.pipe(map((model: Delegate) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public sendTravelRequest(params: any) {
		return this.http.post<Delegate>(`${baseUrl}/send-reminder-travel-details`, params)
			.pipe(map((model: Delegate) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: Delegate, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.delegateValue !== null ) {
					const updatedObjs:Delegate[] = [];
					this.delegateValue.map((x: Delegate) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.delegateSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.delegateValue !== null ) {

					const updatedObjs:Delegate[] = [];
					this.delegateValue.map((x:Delegate) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.delegateSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.delegateValue !== null && deleteId !== undefined ) {

					const updatedObjs:Delegate[] = [];
					this.delegateValue.map((x:Delegate) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.delegateSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('delegate');

	}
}
