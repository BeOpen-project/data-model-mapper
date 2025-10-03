import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../auth/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then((m) => m.AccountModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'dmm-editor',
        loadChildren: () => import('./data-model-mapper/dmm.module').then((m) => m.DMMModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'home',
        loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule),
        canActivate: [AuthGuard],
      },
      /*{
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
        canActivate: [AuthGuard],
      },*/
      {
        path: 'mapper-records',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'landing',
        loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule),
        canActivate: [AuthGuard],
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
