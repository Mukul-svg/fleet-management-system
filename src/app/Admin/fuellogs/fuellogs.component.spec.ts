import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuellogsComponent } from './fuellogs.component';

describe('FuellogsComponent', () => {
  let component: FuellogsComponent;
  let fixture: ComponentFixture<FuellogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuellogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuellogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
