import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbWindowService, NbToastrService, NbDialogRef, NbThemeService } from '@nebular/theme';
import { NgxConfigureService } from 'ngx-configure';
import { AppConfig } from '../../model/appConfig';
import { DMMComponent } from './dmm.component';
import { DMMService } from './dmm.service';
import { ErrorDialogMapperRecordService } from '../error-dialog/error-dialog-mapperRecord.service';
import editor from './mapperEditor';
import { ExportFileTestComponent } from './export-file/export-file-test.component';

function click(id){
  const button = document.getElementById(id);
    if (button) {
      const event = new MouseEvent('click', { bubbles: true });
      button.dispatchEvent(event);
    }
}

@Component({
  selector: 'dmm-test',
  templateUrl: './dmm.component.html',
  styleUrls: ['./dmm.component.scss']
})
export class DmmTestComponent extends DMMComponent implements OnInit, OnChanges {
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
    //public ref: NbDialogRef<DmmTestComponent>
  ) {
    super(document, dialogService, windowService, errorService, dmmService, toastrService, route, themeService, configService);
    this.config = configService.config as AppConfig;
    this.source.emptySource = true;
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.ExportFileComponent = ExportFileTestComponent
    this.test=true
    // rawSource(source)
    this.source.inputType = 'json';
    this.onUpdateInputType('json');
    this.source.sourceEditor.setText(
      JSON.stringify([
        {
          key1: 'value1',
          key2: 'value2',
        },
      ])
    );
    // rawSchema(schema)
    this.schemaEditor.setText(
      JSON.stringify({
        $schema: 'http://json-schema.org/schema#',
        $id: 'dataModels/DataModelTemp.json',
        title: 'DataModelTemp',
        description: 'Bike Hire Docking Station',
        type: 'object',
        properties: {
          e: {
            type: 'string',
          },
          f: {
            type: 'string',
          },
        },
      })
    );
    click("generateMapper")
    // rawMap(map)
    editor.mapperEditor.setText(JSON.stringify({ e: 'key1', f: 'key2', entitySourceId: 'key1', type: 'key1' }));
    // exportFile()
    click("saveAsFile")
    while(!this.dialogClosed)
      await this.sleep(1)
    // exportBash()
    // getPayload()
    // getCurl()
    // preview()
    click("preview")
    let output = await this.getOutput()
    console.debug(output)
    console.assert(output[0].e == "value1" && output[0].f == "value2")
    // transform()
    click("transform")
    output = await this.getOutput()
    console.debug(output)
    console.assert(output[0].e == "value1" && output[0].f == "value2")
    // save()
    // modifySourceSchemaAndMap()
    // exportFile()
    // exportBash()
    // getPayload()
    // getCurl()
    // preview()
    // transform()
    // update()
    // saveAsNew()
  }
  async getOutput() {
    while(this.loading)
      await this.sleep(1)
    return JSON.parse(this.outputEditor.getText())
  }
}

