import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OfficesAddEditPage } from './add.edit.page';


describe('Offices Add/Edit Page', () => {
	let component: OfficesAddEditPage;
	let fixture: ComponentFixture<OfficesAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [OfficesAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(OfficesAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
