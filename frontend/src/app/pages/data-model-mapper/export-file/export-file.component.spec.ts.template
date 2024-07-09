import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ExportFileComponent } from './export-file.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAccordionModule, NbButtonModule, NbCardModule, NbToggleModule, NbIconModule, NbTabsetModule, NbSelectModule, NbInputModule, NbRadioModule, NbWindowModule, NbCheckboxModule, NbUserModule, NbAutocompleteModule } from '@nebular/theme';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CreateMapComponent } from '../create-map/create-map.component';
import { DialogComponent } from '../create-map/dialog/dialog.component';
import { DialogDataMapComponent } from '../dialog-dataMap/dialog-dataMap.component';
import { DialogImportComponent } from '../dialog-import/dialog-import.component';
import { DMMRoutingModule } from '../dmm-routing.module';
import { DMMComponent } from '../dmm.component';
import { DMMService } from '../dmm.service';

describe('ExportFileComponent', () => {
  let component: ExportFileComponent;
  let fixture: ComponentFixture<ExportFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Ng2SmartTableModule,
        CommonModule,
        HttpClientModule,
        DMMRoutingModule,
        NbAccordionModule,
        NbButtonModule,
        NbCardModule,
        NbToggleModule,
        NbIconModule,
        NbTabsetModule,
        NbToggleModule,
        FormsModule,
        NgbDropdownModule,
        NgbCollapseModule,
        NbSelectModule,
        NbInputModule,
        NbRadioModule,
        ReactiveFormsModule,
        NbWindowModule.forChild(),
        NbCheckboxModule,
        NbUserModule,
        TranslateModule.forChild({}),
        NbAutocompleteModule
      ],
      declarations: [DialogImportComponent,DialogDataMapComponent, CreateMapComponent, ExportFileComponent, DMMComponent, DialogComponent],
      providers: [DMMService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
