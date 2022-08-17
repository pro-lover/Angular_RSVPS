import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RsvpCompleteComponent } from './rsvp.complete.component';

describe('RsvpCompleteComponent', () => {
	let component: RsvpCompleteComponent;
	let fixture: ComponentFixture<RsvpCompleteComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
		declarations: [RsvpCompleteComponent],
		imports: [RouterTestingModule],
		teardown: { destroyAfterEach: false }
	}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RsvpCompleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
