import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RsvpProfileComponent } from './rsvp.profile.component';

describe('RsvpProfileComponent', () => {
	let component: RsvpProfileComponent;
	let fixture: ComponentFixture<RsvpProfileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
		declarations: [RsvpProfileComponent],
		imports: [RouterTestingModule],
		teardown: { destroyAfterEach: false }
	}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RsvpProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
