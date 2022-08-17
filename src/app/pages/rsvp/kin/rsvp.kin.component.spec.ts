import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RsvpKinComponent } from './rsvp.kin.component';

describe('RsvpKinComponent', () => {
  let component: RsvpKinComponent;
  let fixture: ComponentFixture<RsvpKinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [RsvpKinComponent],
    imports: [RouterTestingModule],
    teardown: { destroyAfterEach: false }
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpKinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
