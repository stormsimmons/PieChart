import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { CallerComponent } from './caller/caller.component';

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    TooltipComponent,
    CallerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
