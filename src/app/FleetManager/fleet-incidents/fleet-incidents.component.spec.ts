import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetIncidentsComponent } from './fleet-incidents.component';

describe('FleetIncidentsComponent', () => {
  let component: FleetIncidentsComponent;
  let fixture: ComponentFixture<FleetIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetIncidentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
