import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoeSizesListPage } from './list.page';


describe('Shoe Sizes ListPage', () => {
	let component: ShoeSizesListPage;
	let fixture: ComponentFixture<ShoeSizesListPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ShoeSizesListPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ShoeSizesListPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
