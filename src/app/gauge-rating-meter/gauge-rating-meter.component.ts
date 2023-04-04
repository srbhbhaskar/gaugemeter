import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

interface ColorSegment {
  color: string;
  startValue: number;
  endValue: number;
}

@Component({
  selector: 'app-gauge-rating-meter',
  templateUrl: './gauge-rating-meter.component.html',
  styleUrls: ['./gauge-rating-meter.component.css'],
})
export class GaugeRatingMeterComponent implements OnChanges {
  @ViewChild('colorArcCanvas', { static: true }) colorArcCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() colorSegments: ColorSegment[] = [
    { color: '#1AB16D', startValue: 10, endValue: 33 },
    { color: '#FFAD1F', startValue: 33, endValue: 66 },
    { color: '#DE1D11', startValue: 66, endValue: 100 },
  ];

  @Input() measuredValue: number = 60;

  constructor() {}

  ngOnInit(): void {
    this.drawGauge();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('colorSegments' in changes || 'measuredValue' in changes) {

      this.drawGauge();
    }
  }


  ngAfterViewInit(): void {
    this.colorArcCanvas.nativeElement.width = 400;
    this.colorArcCanvas.nativeElement.height = 220; // Increase the height
    this.drawGauge();
  }

  private clearCanvas(): void {
    const ctx = this.colorArcCanvas.nativeElement.getContext('2d');
    const width = this.colorArcCanvas.nativeElement.width;
    const height = this.colorArcCanvas.nativeElement.height;
    ctx.clearRect(0, 0, width, height);
  }


  private drawColorArc(): void {
    const ctx = this.colorArcCanvas.nativeElement.getContext('2d');
    const width = this.colorArcCanvas.nativeElement.width;
    const height = this.colorArcCanvas.nativeElement.height;

    const drawSegment = (color: string, startAngle: number, endAngle: number) => {
      ctx.beginPath();
      ctx.arc(width / 2, height, width / 2 - 10, startAngle, endAngle);
      ctx.lineWidth = 20;
      ctx.strokeStyle = color;
      ctx.lineCap = 'round'; // Add this line to create rounded caps for the arc stops
      ctx.stroke();
    };

    const totalAngle = Math.PI;
    const gap = 0.35;

    for (let segment of this.colorSegments) {
      const startAngle = Math.PI + totalAngle * segment.startValue / 100;
      const endAngle = Math.PI + totalAngle * segment.endValue / 100 - gap / 2;

      drawSegment(segment.color, startAngle, endAngle);
    }

    // Set the canvas z-index to 1 (the default value)
    this.colorArcCanvas.nativeElement.style.zIndex = '1';

    // Call the drawNeedle method with the value parameter, if provided
    this.drawNeedle();

    // Set the canvas z-index to 3 (above the grey circle)
    this.colorArcCanvas.nativeElement.style.zIndex = '3';
  }



  private drawGauge(): void {
    this.clearCanvas();
    this.drawColorArc();
    this.drawNeedle();
  }

  private drawNeedle(): void {
    const ctx = this.colorArcCanvas.nativeElement.getContext('2d');
    const width = this.colorArcCanvas.nativeElement.width;
    const height = this.colorArcCanvas.nativeElement.height;

    const centerX = width / 2;
    const centerY = height - 20;

    // Calculate the relative position of the needle based on the value and the range of the arc
    const min = 100;
    const max = 0;
    const range = max - min;
    const relativePosition = (this.measuredValue - min) / range;

    // Calculate the angle of the needle based on its relative position
    const angle = Math.PI * relativePosition;

    // Calculate the coordinates of the needle's tip
    const needleLength = width / 2 - 40;
    const needleTipX = centerX + (0.75 * needleLength) * Math.cos(angle); // Adjusted the X coordinate of the tip
    const needleTipY = centerY - (0.75 * needleLength) * Math.sin(angle); // Adjusted the Y coordinate of the tip

    // Calculate the coordinates of the needle's base points
    const baseAngle = Math.PI / 15;
    const baseX1 = centerX + 15 * Math.cos(angle - baseAngle);
    const baseY1 = centerY - 15 * Math.sin(angle - baseAngle);
    const baseX2 = centerX + 15 * Math.cos(angle + baseAngle);
    const baseY2 = centerY - 15 * Math.sin(angle + baseAngle);

    // Draw the bigger grey circle below the needle base
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fillStyle = 'grey';
    ctx.fill();

    // Draw the filled black circle below the needle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Draw the needle
    ctx.beginPath();
    ctx.moveTo(baseX1, baseY1);
    ctx.lineTo(needleTipX, needleTipY);
    ctx.lineTo(baseX2, baseY2);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Draw the outer oval at the base of the needle
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 8, 6, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Draw the inner white oval at the base of the needle
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, 4, 3, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();

    // Set the canvas z-index to 3 (above the grey circle)
    this.colorArcCanvas.nativeElement.style.zIndex = '3';
  }








}
