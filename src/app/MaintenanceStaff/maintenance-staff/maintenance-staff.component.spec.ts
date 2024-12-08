import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceStaffComponent } from './maintenance-staff.component';

describe('MaintenanceStaffComponent', () => {
  let component: MaintenanceStaffComponent;
  let fixture: ComponentFixture<MaintenanceStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
