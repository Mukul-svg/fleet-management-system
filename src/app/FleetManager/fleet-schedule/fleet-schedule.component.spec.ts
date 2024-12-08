import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetScheduleComponent } from './fleet-schedule.component';

describe('FleetScheduleComponent', () => {
  let component: FleetScheduleComponent;
  let fixture: ComponentFixture<FleetScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
