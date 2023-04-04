import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeRatingMeterComponent } from './gauge-rating-meter.component';

describe('GaugeRatingMeterComponent', () => {
  let component: GaugeRatingMeterComponent;
  let fixture: ComponentFixture<GaugeRatingMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaugeRatingMeterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaugeRatingMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
