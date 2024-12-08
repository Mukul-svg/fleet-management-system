import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetFuellogsComponent } from './fleet-fuellogs.component';

describe('FleetFuellogsComponent', () => {
  let component: FleetFuellogsComponent;
  let fixture: ComponentFixture<FleetFuellogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FleetFuellogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetFuellogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
