import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GaugeRatingMeterComponent } from './gauge-rating-meter/gauge-rating-meter.component';

@NgModule({
  declarations: [
    AppComponent,
    GaugeRatingMeterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
