import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbWindowService, NbToastrService, NbDialogRef, NbThemeService } from '@nebular/theme';
import { NgxConfigureService } from 'ngx-configure';
import { AppConfig } from '../../../model/appConfig';
import { DMMComponent } from '../../data-model-mapper/dmm.component';
import { DMMService } from '../../data-model-mapper/dmm.service';
import { ErrorDialogMapperRecordService } from '../../error-dialog/error-dialog-mapperRecord.service';
import editor from '../../data-model-mapper/mapperEditor';

function click(id){
  const button = document.getElementById(id);
    if (button) {
      const event = new MouseEvent('click', { bubbles: true });
      button.dispatchEvent(event);
    }
}

@Component({
  selector: 'app-testDmmEditor',
  templateUrl: '../../data-model-mapper/dmm.component.html',
  styleUrls: ['./testDmmEditor.component.scss'],
})
export class TestDmmEditorComponent extends DMMComponent implements OnInit, OnChanges {
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
    public ref: NbDialogRef<TestDmmEditorComponent>
  ) {
    super(document, dialogService, windowService, errorService, dmmService, toastrService, route, themeService, configService);
    this.config = configService.config as AppConfig;
    this.source.emptySource = true;
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
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
    const generateMapperButton = document.getElementById('generateMapper');
    if (generateMapperButton) {
      const event = new MouseEvent('click', { bubbles: true });
      generateMapperButton.dispatchEvent(event);
    }
    // rawMap(map)
    editor.mapperEditor.setText(JSON.stringify({ e: 'key1', f: 'key2', entitySourceId: 'key1', type: 'key1' }));
    // exportFile()
    click("saveAsFile")
    // exportBash()
    // getPayload()
    // getCurl()
    // preview()
    click("preview")
    /*
    const previewButton = document.getElementById('preview');
    if (previewButton) {
      const event = new MouseEvent('click', { bubbles: true });
      previewButton.dispatchEvent(event);
    }
      */
    let output = JSON.parse(this.outputEditor.getText())
    console.assert(output.e == "value1" && output.f == "value2")
    // transform()
    click("transform")
    /*
    const transformwButton = document.getElementById('preview');
    if (transformwButton) {
      const event = new MouseEvent('click', { bubbles: true });
      transformwButton.dispatchEvent(event);
    }*/
    output = JSON.parse(this.outputEditor.getText())
    console.assert(output.e == "value1" && output.f == "value2")
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
}
