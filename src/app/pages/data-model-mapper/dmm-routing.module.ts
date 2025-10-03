import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DMMComponent } from './dmm.component';
import { DmmTestComponent } from './dmm-test.component';

const routes: Routes = [
  {
    path: '',
    component: DMMComponent,
  },
  {
    path: 'test',
    component: DmmTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DMMRoutingModule {}
