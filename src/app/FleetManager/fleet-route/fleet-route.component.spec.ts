import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetRouteComponent } from './fleet-route.component';

describe('FleetRouteComponent', () => {
  let component: FleetRouteComponent;
  let fixture: ComponentFixture<FleetRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
