import { DMMComponent } from './../../data-model-mapper/dmm.component';
import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { NbDialogRef, NbDialogService, NbThemeService, NbToastrService, NbWindowService } from '@nebular/theme';
import * as _ from 'lodash';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgxConfigureService } from 'ngx-configure';
import { AppConfig } from '../../../model/appConfig';
import { DMMService } from '../../data-model-mapper/dmm.service';
import { ErrorDialogMapperRecordService } from '../../error-dialog/error-dialog-mapperRecord.service';

@Component({
  selector: 'transform',
  //templateUrl: './transform.component.html',
  templateUrl: '../../data-model-mapper/dmm.component.html',
  styleUrls: ['./transform.component.scss', "../../data-model-mapper/stepper_test.scss"],
})
export class TransformComponent extends DMMComponent implements OnInit, OnChanges {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public dialogService: NbDialogService,
    public windowService: NbWindowService,
    public errorService: ErrorDialogMapperRecordService,
    public dmmService: DMMService,
    public toastrService: NbToastrService,
    public route: ActivatedRoute,
    public themeService: NbThemeService,
    public configService: NgxConfigureService,
    public ref: NbDialogRef<TransformComponent>
  ) {
    super(document, dialogService, windowService, errorService, dmmService, toastrService, route, themeService, configService);
    this.config = configService.config as AppConfig;
    this.source.emptySource = true;
  }
}
