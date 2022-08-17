import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryAddEditPage } from './add.edit.page';


describe('Country Add/Edit Page', () => {
	let component: CountryAddEditPage;
	let fixture: ComponentFixture<CountryAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CountryAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CountryAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
