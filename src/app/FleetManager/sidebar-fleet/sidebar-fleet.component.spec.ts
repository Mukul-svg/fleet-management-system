import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFleetComponent } from './sidebar-fleet.component';

describe('SidebarFleetComponent', () => {
  let component: SidebarFleetComponent;
  let fixture: ComponentFixture<SidebarFleetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarFleetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
