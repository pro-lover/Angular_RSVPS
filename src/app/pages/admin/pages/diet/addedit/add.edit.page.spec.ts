import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShirtSizesAddEditPage } from './add.edit.page';


describe('Shirt Sizes Add/Edit Page', () => {
	let component: ShirtSizesAddEditPage;
	let fixture: ComponentFixture<ShirtSizesAddEditPage>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ShirtSizesAddEditPage],
			teardown: { destroyAfterEach: false }
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ShirtSizesAddEditPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
