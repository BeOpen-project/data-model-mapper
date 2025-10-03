import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandComponent } from './land.component';
import { LandRoutingModule } from './land-routing.module';



@NgModule({
  declarations: [LandComponent],
  imports: [
    CommonModule,
    LandRoutingModule
  ]
})
export class LandModule { }
