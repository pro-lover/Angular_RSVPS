import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminListPage } from './list.page';


describe('Admin ListPage', () => {
	let component: AdminListPage;
	let fixture: ComponentFixture<AdminListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AdminListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
