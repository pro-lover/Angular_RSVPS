import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GendersAddEditPage } from './add.edit.page';


describe('Genders Add/Edit Page', () => {
	let component: GendersAddEditPage;
	let fixture: ComponentFixture<GendersAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [GendersAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GendersAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
