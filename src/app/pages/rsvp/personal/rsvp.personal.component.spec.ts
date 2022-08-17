import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RsvpPersonalComponent } from './rsvp.personal.component';

describe('RsvpPersonalComponent', () => {
  let component: RsvpPersonalComponent;
  let fixture: ComponentFixture<RsvpPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [RsvpPersonalComponent],
    imports: [RouterTestingModule],
    teardown: { destroyAfterEach: false }
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
