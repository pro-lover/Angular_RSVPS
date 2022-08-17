import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfficesListPage } from './list.page';


describe('Offices ListPage', () => {
	let component: OfficesListPage;
	let fixture: ComponentFixture<OfficesListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [OfficesListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(OfficesListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
