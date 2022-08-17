import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryListPage } from './list.page';


describe('Country ListPage', () => {
	let component: CountryListPage;
	let fixture: ComponentFixture<CountryListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CountryListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CountryListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
