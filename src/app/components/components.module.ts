import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NgChartsModule } from 'ng2-charts';

import { DonutComponent } from './donut/donut.component';
import { IncrementadorComponent } from './incrementador/incrementador.component';

@NgModule({
  declarations: [
    IncrementadorComponent,
    DonutComponent
  ],
  exports: [
    IncrementadorComponent,
    DonutComponent,
    NgChartsModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
})
export class ComponentsModule { }
