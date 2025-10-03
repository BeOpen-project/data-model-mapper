import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbMenuModule, NbCardModule, NbSelectModule, NbAccordionModule, NbButtonModule, NbSpinnerModule, NbIconModule, NbToastrModule, NbContextMenuModule, NbInputModule, NbCheckboxModule, NbTagModule, NbRadioModule, NbTabsetModule, NbAutocompleteModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { HomeRoutingModule } from '../home/home-routing.module';
import { PagesRoutingModule } from '../pages-routing.module';



@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ThemeModule,
    NbMenuModule,
    CommonModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbSelectModule,
    NbAccordionModule,
    NbButtonModule,
    NbSpinnerModule,
    NbIconModule,
    NbToastrModule,
    NbContextMenuModule,
    NbInputModule,
    NbCheckboxModule,
    NbTagModule,
    NbRadioModule,
    NbTabsetModule,
    TranslateModule.forChild({}),
    FormsModule,
    ReactiveFormsModule,
    NbAutocompleteModule,
    NbSpinnerModule,
  ]
})
export class LandingModule { }
