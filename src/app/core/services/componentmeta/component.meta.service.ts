import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentMeta } from '@app/core/models';
import { StateDataService } from '@app/core/services/state/state.data.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const baseUrl = `${environment.apiUrl}/componentmeta`;

@Injectable({ providedIn: 'root' })
export class ComponentMetaService {
	private componentMetaSubject: BehaviorSubject<ComponentMeta[]>;
	public componentMeta: Observable<ComponentMeta[]>;

	constructor(
		private http: HttpClient,
		private stateDataService: StateDataService
	) {
		this.componentMetaSubject = new BehaviorSubject<ComponentMeta[]>([]);
		this.componentMeta = this.componentMetaSubject.asObservable();
	}

	public get componentMetaValue(): ComponentMeta[] {
		return this.componentMetaSubject.value;
	}

	public getAll() {
		if( this.componentMetaValue !== null && this.componentMetaValue.length > 0 ) {

			//console.warn('Collection initialised in service:', this.componentMetaValue);
			return this.componentMetaSubject;

		} else {
			return this.http.get<ComponentMeta[]>(baseUrl)
				.pipe(map((modelCollection: ComponentMeta[]) => {
						// publish updated collection to subscribers
						this.componentMetaSubject.next(modelCollection);
						return modelCollection;
					})
				);
		}

	}

	public getById(id: string) {
		return this.http.get<ComponentMeta>(`${baseUrl}/${id}`);
	}

	public create(params: any) {
		return this.http.post<ComponentMeta>(baseUrl, params)
			.pipe(map((model: ComponentMeta) => {

				this.refreshCollection('create', model);

				return model;

			}));
	}

	public upload(params: any) {
		const formData = new FormData();
    	formData.append('file', params?.file);
		formData.append('filepath', params?.path);

		return this.http.post(`${baseUrl}/upload-asset`, formData);
	}

    public update(id:string, params: any) {
		return this.http.put<ComponentMeta>(`${baseUrl}/${id}`, params)
			.pipe(map((model: ComponentMeta) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateComponentMeta(id:string, params: any) {
		return this.http.put<ComponentMeta>(`${baseUrl}/${id}/update-meta`, params)
			.pipe(map((model: ComponentMeta) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateStatus(id: string, params: any) {
		return this.http.put<ComponentMeta>(`${baseUrl}/${id}/update-status`, params)
			.pipe(map((model: ComponentMeta) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public updateSmartStatus(id: string, params: any) {
		return this.http.put<ComponentMeta>(`${baseUrl}/${id}/update-smartstatus`, params)
			.pipe(map((model: ComponentMeta) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public restore(id: string) {
		return this.http.put<ComponentMeta>(`${baseUrl}/${id}/restore`, {})
			.pipe(map((model: ComponentMeta) => {

				this.refreshCollection('update', model);

				return model;

			}));
	}

	public delete(id: string) {
		return this.http.delete<ComponentMeta>(`${baseUrl}/${id}`)
			.pipe(map((model: ComponentMeta) => {

				this.refreshCollection('delete', model, id);

				return model;

			}));
	}

    // helper methods
	private refreshCollection( type: string, model: ComponentMeta, deleteId?:string ) : void {

		switch (type)
		{
			case 'create':

				if( this.componentMetaValue !== null ) {
					const updatedObjs:ComponentMeta[] = [];
					this.componentMetaValue.map((x: ComponentMeta) => {
						updatedObjs.push(x);
					});
					updatedObjs.push(model);

					// publish updated collection to subscribers
					this.componentMetaSubject.next(updatedObjs);
				}

				break;

			case 'update':

				if( this.componentMetaValue !== null ) {

					const updatedObjs:ComponentMeta[] = [];
					this.componentMetaValue.map((x:ComponentMeta) => {
						if( x.id === model.id ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});

					// publish updated collection to subscribers
					this.componentMetaSubject.next(updatedObjs);

				}

				break;

			case 'delete':

				if( this.componentMetaValue !== null && deleteId !== undefined ) {

					const updatedObjs:ComponentMeta[] = [];
					this.componentMetaValue.map((x:ComponentMeta) => {
						if( parseInt(x.id) === parseInt(deleteId) ) {
							updatedObjs.push(model);
						} else {
							updatedObjs.push(x);
						}
					});
					// publish updated collection to subscribers
					this.componentMetaSubject.next(updatedObjs);

				}

				break;

		}

		// tell state data service to announce that model collection has been updated
		this.stateDataService.announceUpdate('componentmeta');

	}

}
