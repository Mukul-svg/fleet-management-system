import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCargoComponent } from './customer-cargo.component';

describe('CustomerCargoComponent', () => {
  let component: CustomerCargoComponent;
  let fixture: ComponentFixture<CustomerCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCargoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
