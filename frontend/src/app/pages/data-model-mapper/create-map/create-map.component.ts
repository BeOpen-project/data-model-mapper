import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogRef, NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition, NbToastrConfig, NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NgxConfigureService } from 'ngx-configure';
import { Mapper } from '../../../model/mapperRecord/mapper';
import { AppConfig } from '../../../model/appConfig';
import { ErrorDialogMapperRecordService } from '../../error-dialog/error-dialog-mapperRecord.service';
import { DMMService } from '../dmm.service';
import { Router } from '@angular/router';

@Component({
  selector: 'create-map-and-mapperRecord',
  templateUrl: './create-map.component.html',
  styleUrls: ['./create-map.component.scss']
})
export class CreateMapComponent implements OnInit {

  //TODO check if properties cleaning is required
  @Input() value: any;
  @Output() editedValue = new EventEmitter<unknown>();
  mapperRecordId: string
  message: string
  name: string = ''
  sourceDataType: string
  selectedFile: File;
  json: Record<string, unknown>;
  loaded = false
  mappers: Mapper[];
  createMapperRecord = false
  mapId: string
  unsaved: { schema: any; source: any; }
  status: string
  description: string
  save: boolean
  sources: object[]
  dataModels: object[]
  saveSchema = false
  path: string
  saveSource = false
  placeholders = {
    mapperRecordId: this.translate.instant('general.mapperRecords.mapperRecordId'),
    mapId: this.translate.instant('general.dmm.mapId')
  }
  jsonMap: object;
  schema: object;
  config: object;
  sourceDataURL: string;
  dataModelURL: string;
  sourceData: string | object;
  dataModelID: string
  sourceDataID: string;
  sourceSaved: any;
  schemaSaved: any;
  minioObjName: string
  bucket: string
  etag: any;

  constructor(
    protected dialogService: NbDialogService,
    private dmmService: DMMService,
    protected ref: NbDialogRef<CreateMapComponent>,
    private toastrService: NbToastrService,
    private errorService: ErrorDialogMapperRecordService,
    private translate: TranslateService,
    private router: Router
  ) { }

  cancel(): void {
    this.fixBrokenPageBug()
    this.ref.close();
  }

  fixBrokenPageBug() { document.getElementsByTagName('html')[0].className = "" }

  ngOnInit(): void {
    this.loaded = false
    if (this.value) //TODO check if it is required using value
      for (let key in this.value)
        this[key] = this.value[key]
    console.debug(this)
    console.debug(this.saveSchema)
    console.debug(this.saveSource)
    if (!this.unsaved.schema)
      this.saveSchema = false
    if (!this.unsaved.source)
      this.saveSource = false
    console.debug(this.saveSchema)
    console.debug(this.saveSource)
  }

  confirm() {
    try {
      this.fixBrokenPageBug()
      this.onSubmit()
    }
    catch (error) {
      console.error(error)
    }
  }

  confirmSubmit() {
    this.fixBrokenPageBug()
    this.ref.close(true)
  }

  async onSubmit() {
    if ((this.unsaved.schema && !this.saveSchema) || (this.unsaved.source && !this.saveSource))
      this.dialogService.open(CreateMapComponent, {
        context: {
          message: "There are unsaved changes. Are you sure you want to discard them ?"
        }
      }).onClose.subscribe(async (confirm) => {
        if (confirm) {
          await this.submit()
        }
      });
    else
      await this.submit()
  }

  selectFiltered(property: string, key: string, value: string) {
    try {
      return this[property].filter((filteredProperty: { [x: string]: string | object | number; mapRef: string; }) => filteredProperty[key] == value && filteredProperty.mapRef)[0]
    }
    catch (error) {
      console.error(error)
      return false
    }
  }

  sourceNameAlreadyExists() { return this.saveSource && this.selectFiltered("sources", "name", this.name) }
  schemaNameAlreadyExists() { return this.saveSchema && this.selectFiltered("dataModels", "name", this.name) }

  async submit() {
    let errors: boolean
    let name = this.name,
      mapperRecordId = this.mapperRecordId,
      description = this.description,
      status = this.status

    if (this.sourceNameAlreadyExists()) //TODO this way a different source with the same name will be overwritten. Change this or sourceNameAlreadyExists fn
      this.sourceSaved = true //TODO this way a different source with the same name will be overwritten . Change this or sourceNameAlreadyExists fn

    if (!errors && this.schemaNameAlreadyExists()) //TODO this way a different schema with the same name will be overwritten. Change this or schemaAlreadyExists fn
      this.schemaSaved = true //TODO this way a different schema with the same name will be overwritten. Change this or schemaAlreadyExists fn

    if (!errors)
      try {

        const params = [
          mapperRecordId,
          name,
          status,
          description,
          this.jsonMap,
          this.saveSchema || (!this.dataModelURL && !this.dataModelID) ? this.schema : undefined,
          this.sourceDataType,
          this.config,
          this.saveSource ? undefined : this.sourceDataURL,
          this.saveSchema ? undefined : this.dataModelURL,
          this.saveSchema ? undefined : this.dataModelID,
          this.saveSource ? this.sourceData : undefined,
          this.saveSource ? undefined : this.sourceDataID,
          this.saveSource ? undefined : this.minioObjName,
          this.saveSource ? undefined : this.bucket,
          this.saveSource ? undefined : this.etag,
          this.path
        ] as const

        if (this.save) {
          let mapperRecord = await this.dmmService.saveMap(...params);
          mapperRecord.mapperRecordId = this.mapperRecordId = mapperRecord._id;
          if (!errors && this.saveSchema)
            try {
              if (!this.schemaSaved)
                await this.dmmService.saveSchema(name, this.mapperRecordId, status, description, this.schema);
              else
                await this.dmmService.updateSchema(name, this.mapperRecordId, status, description, this.schema);
            }
            catch (error) {
              this.errorHandle("schema", error)
              errors = true
            }
          if (!errors && this.saveSource)
            try {
              if (!this.sourceSaved)
                await this.dmmService.saveSource(name, this.mapperRecordId, status, description, this.sourceData, this.minioObjName, this.bucket, this.etag, this.path);
              else
                await this.dmmService.updateSource(name, this.mapperRecordId, status, description, this.sourceData, this.minioObjName, this.bucket, this.etag, this.path);
            }
            catch (error) {
              this.errorHandle("source", error)
              errors = true
            }
          if (this.saveSchema || this.saveSource) {
            mapperRecord = await this.dmmService.getMap(mapperRecord._id)
            mapperRecord.mapperRecordId = this.mapperRecordId
          }
          if (!errors) {
            console.debug(mapperRecord)
            this.ref.close({ ...mapperRecord, saveSchema: this.saveSchema, saveSource: this.saveSource });
            this.editedValue.emit({ ...mapperRecord });
            this.showToast('primary', this.translate.instant('general.dmm.map_added_message'), '');
          }
        }

        else {
          let mapperRecord = await this.dmmService.updateMap(...params);
          mapperRecord.mapperRecordId = this.mapperRecordId = mapperRecord._id;
          mapperRecord.description = this.description
          mapperRecord.status = this.status
          if (!errors && this.saveSchema)
            try {
              if (!this.schemaSaved)
                await this.dmmService.saveSchema(name, this.mapperRecordId, status, description, this.schema);
              else
                await this.dmmService.updateSchema(name, this.mapperRecordId, status, description, this.schema);
            }
            catch (error) {
              this.errorHandle("schema", error)
              errors = true
            }
          if (!errors && this.saveSource)
            try {
              if (!this.sourceSaved)
                await this.dmmService.saveSource(name, this.mapperRecordId, status, description, this.sourceData, this.minioObjName, this.bucket, this.etag, this.path);
              else
                await this.dmmService.updateSource(name, this.mapperRecordId, status, description, this.sourceData, this.minioObjName, this.bucket, this.etag, this.path);
            }
            catch (error) {
              this.errorHandle("source", error)
              errors = true
            }
          if (this.saveSchema || this.saveSource) {
            mapperRecord = await this.dmmService.getMap(mapperRecord._id)
            mapperRecord.mapperRecordId = this.mapperRecordId
          }
          if (!errors) {
            this.ref.close({ ...mapperRecord, saveSchema: this.saveSchema, saveSource: this.saveSource });
            this.editedValue.emit({ ...mapperRecord });
            this.showToast('primary', this.translate.instant('general.dmm.map_edited_message'), '');
          }
        }

      }
      catch (error) {
        this.errorHandle("record", error)
        errors = true
      }
  }

  errorHandle(entity: string, error) {
    console.error(error)
    let errors: Object[] = []

    if (!this.jsonMap) errors.push({
      path: "root.map",
      message: "Value required",
      errorcount: JSON.parse(JSON.stringify(errors.length)) + 1
    })
    if (!this.schema && !this.dataModelID && !this.dataModelURL) errors.push({
      path: "root.schema",
      message: "Value required",
      errorcount: JSON.parse(JSON.stringify(errors.length)) + 1
    })
    if (!this.mapperRecordId)
      console.error("could not retrieve mapperRecordId")
    if (!this.name) errors.push({
      path: "root.name",
      property: "minLength",
      message: "Value required",
      errorcount: JSON.parse(JSON.stringify(errors.length)) + 1
    })
    if (!this.status) errors.push({
      path: "root.status",
      property: "minLength",
      message: "Value required",
      errorcount: JSON.parse(JSON.stringify(errors.length)) + 1
    })
    if (!this.description) errors.push({
      path: "root.description",
      property: "minLength",
      message: "Value required",
      errorcount: JSON.parse(JSON.stringify(errors.length)) + 1
    })
    if (!this.sourceData && !this.sourceDataURL && !this.sourceDataID && !this.bucket && !this.minioObjName) errors.push({
      path: "root.source",
      property: "minLength",
      message: "Value required",
      errorcount: JSON.parse(JSON.stringify(errors.length)) + 1
    })
    if (error.status == 403 || error.status == 401)
      this.router.navigateByUrl('/login/loginPopup');
    else if (error.status == 0)
      this.errorService.openErrorDialog(error)
    else if (error?.status == 400 || error?.message == "Schema required" || error?.message == "Map required")
      if (error?.error == "id already exists" || error?.error?.error == "id already exists")
        this.errorService.openErrorDialog({
          error: 'EDITOR_VALIDATION_ERROR', validationErrors: [
            ...errors,
            {
              path: "root._id",
              property: "minLength",
              message: "A " + entity + " with map ID < " + this.mapperRecordId + " > already exists",
              errorcount: JSON.parse(JSON.stringify(errors.length)) + 1
            }
          ]
        });
      else this.errorService.openErrorDialog({
        error: 'EDITOR_VALIDATION_ERROR', validationErrors: errors
      });
    else this.errorService.openErrorDialog(error);
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2500,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      preventDuplicates: true,
    } as Partial<NbToastrConfig>;

    this.toastrService.show(body, title, config);
  }
}

