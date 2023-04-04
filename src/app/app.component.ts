import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  measuredValue: number = 60;
  inputMeasuredValue: number = 60;

  colorSegments: any[] = [
    { color: '#1AB16D', startValue: 10, endValue: 33 },
    { color: '#FFAD1F', startValue: 33, endValue: 66 },
    { color: '#DE1D11', startValue: 66, endValue: 100 },
  ];

  constructor() {}

  updateGauge(): void {
    this.measuredValue = this.inputMeasuredValue;
    this.colorSegments = [...this.colorSegments]; // Create a new array reference to trigger ngOnChanges
  }
}
