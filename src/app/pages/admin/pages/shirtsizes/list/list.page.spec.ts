import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShortSizesListPage } from './list.page';


describe('Shirt Sizes ListPage', () => {
	let component: ShortSizesListPage;
	let fixture: ComponentFixture<ShortSizesListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ShortSizesListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ShortSizesListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
