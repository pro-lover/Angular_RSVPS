import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RsvpTravelComponent } from './rsvp.travel.component';

describe('RsvpTravelComponent', () => {
	let component: RsvpTravelComponent;
	let fixture: ComponentFixture<RsvpTravelComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
		declarations: [RsvpTravelComponent],
		imports: [RouterTestingModule],
		teardown: { destroyAfterEach: false }
	}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RsvpTravelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
