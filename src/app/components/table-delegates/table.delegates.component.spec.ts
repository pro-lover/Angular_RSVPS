import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableDelegatesListComponent } from './table.delegates.component';


describe('Delegates List Component', () => {
	let component: TableDelegatesListComponent;
	let fixture: ComponentFixture<TableDelegatesListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TableDelegatesListComponent],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TableDelegatesListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
