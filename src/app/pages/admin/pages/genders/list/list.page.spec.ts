import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GendersListPage } from './list.page';


describe('Genders ListPage', () => {
	let component: GendersListPage;
	let fixture: ComponentFixture<GendersListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GendersListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GendersListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
