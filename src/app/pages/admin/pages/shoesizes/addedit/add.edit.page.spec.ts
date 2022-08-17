import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoeSizesAddEditPage } from './add.edit.page';


describe('Shoe Sizes Add/Edit Page', () => {
	let component: ShoeSizesAddEditPage;
	let fixture: ComponentFixture<ShoeSizesAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ShoeSizesAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ShoeSizesAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
