import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RsvpPage } from './rsvp.page';

describe('RsvpPage', () => {
  let component: RsvpPage;
  let fixture: ComponentFixture<RsvpPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [RsvpPage],
    imports: [RouterTestingModule],
    teardown: { destroyAfterEach: false }
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
