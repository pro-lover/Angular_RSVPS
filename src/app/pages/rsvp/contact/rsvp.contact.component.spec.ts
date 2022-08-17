import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RsvpContactComponent } from './rsvp.contact.component';

describe('RsvpContactComponent', () => {
  let component: RsvpContactComponent;
  let fixture: ComponentFixture<RsvpContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [RsvpContactComponent],
    imports: [RouterTestingModule],
    teardown: { destroyAfterEach: false }
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
