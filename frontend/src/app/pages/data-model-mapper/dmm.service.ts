import { Injectable } from '@angular/core';
import { NgxConfigureService } from 'ngx-configure';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../../model/appConfig';
import { MapperRecordEntry } from '../../model/mapperRecord/mapperRecordEntry';
var urlencode = require('urlencode');
const multiPartOptions = {
  headers: new HttpHeaders({
    "Content-Type": "multipart/form-data" // 👈
  })
}

@Injectable({
  providedIn: 'root',
})
export class DMMService {

  private config: AppConfig;
  buckets: string = ""

  constructor(configService: NgxConfigureService, private http: HttpClient) {
    this.config = configService.config as AppConfig;
    for (let bucket of this.config.data_model_mapper.minioBuckets)
      this.buckets = this.buckets.concat("&bucketName=" + bucket)
  }

  getSchemas(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/dataModels").toPromise();

  }

  getMaps(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/maps").toPromise();
  }

  getToken(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/bearer").toPromise();
  }

  getSources(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/sources?format=json" + this.buckets).toPromise();
  }

  getDBSources(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/sources/db").toPromise();
  }

  /*
  getMinioSources(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/minio/getObjects?format=json" + this.buckets).toPromise();
  }

  getMinioBucketsList(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/getBuckets").toPromise();
  }

  getMinioSourcesList(bucketName): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/minio/listObjects/" + urlencode(bucketName)).toPromise();

  }*/


  getMinioObject(bucketName: string, objectName: string) {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/minio/getObject" + "/" + urlencode(bucketName) + "/" + urlencode(objectName)).toPromise();
  }

  getConfig(): any {
    return this.http.get<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/config").toPromise();
  }

  getBackupConfig(): any {
    return this.http.get<any[]>("assets/transformConfig.json").toPromise();
  }

  getSource(id, name, mapRef): any {
    return this.http.get<any>(this.config.data_model_mapper.default_mapper_base_url + "/source?" + (
      id ? "id=" + urlencode(id) :
        name ? "name=" + urlencode(name) :
          mapRef ? "mapRef=" + urlencode(mapRef) : ""
    )).toPromise();
  }

  getMap(id): any {
    return this.http.get<any>(this.config.data_model_mapper.default_mapper_base_url + "/map?id=" + urlencode(id)).toPromise();
  }

  getSchema(id, name, mapRef): any {
    return this.http.get<any>(this.config.data_model_mapper.default_mapper_base_url + "/dataModel?" + (
      id ? "id=" + urlencode(id) :
        name ? "name=" + urlencode(name) :
          mapRef ? "mapRef=" + urlencode(mapRef) : ""
    )).toPromise();
  }

  deleteMap(id: any) {
    return this.http.delete<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/map?id=" + urlencode(id)).toPromise();
  }

  refParse(schema) {
    console.log("wait backend")
    if (Array.isArray(schema)) schema = schema[0]
    return this.http.post<any>(this.config.data_model_mapper.default_mapper_base_url + "/dereferenceSchema", schema).toPromise();
  }

  cleanSchema(schema) {
    console.log("wait backend")
    if (Array.isArray(schema)) schema = schema[0]
    return this.http.post<any>(this.config.data_model_mapper.default_mapper_base_url + "/cleanSchema", schema).toPromise();
  }

  getRemoteSource(url, type) {
    return type == "csv" ?
      this.http.get<any>(url, { responseType: 'text' as 'json' }).toPromise() :
      this.http.get<any>(url).toPromise()
  }

  saveMap(id, name, status, description, map, schema, sourceDataType, config, sourceDataURL, dataModelURL, dataModelID, sourceData, sourceDataID, minioObjName, bucket, etag, path): any {
    if (schema?.$id) schema.$id = undefined
    return this.http.post<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/map/register",
      this.formDataBuilder(
        {
          id,
          name,
          status: status,
          description: description,
          map: map,
          dataModel: schema ? schema[0] ? schema[0] : schema : schema,
          sourceDataType: sourceDataType,
          config: config,
          sourceDataURL,
          sourceDataID,
          dataModelURL,
          path,
          dataModelID,
          sourceData,
          sourceDataMinio: {
            name: minioObjName,
            bucket,
            etag
          }
        })).toPromise();
  }

  formDataBuilder(body) {
    const file = JSON.stringify(body);
    const formData = new FormData();
    formData.append('file', file);
    return formData
  }

  saveSchema(name, mapRef, status, description, schema): any {
    if (schema?.$id) schema.$id = undefined

    return this.http.post<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/dataModel", this.formDataBuilder({
      mapRef,
      name,
      status: status,
      description: description,
      dataModel: schema ? schema[0] ? schema[0] : schema : schema,
    })).toPromise();
  }

  updateSource(name, mapRef, status: any, description: any, sourceData: any, minioObjName, bucket, etag, path) {
    return this.http.put<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/source", this.formDataBuilder({
      mapRef,
      name,
      sourceDataMinio: {
        name: minioObjName,
        bucket,
        etag
      },
      status: status,
      description: description,
      path,
      source: sourceData,
    })).toPromise();
  }
  saveSource(name, mapRef, status: any, description: any, sourceData: any, minioObjName, bucket, etag, path) {
    return this.http.post<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/source", this.formDataBuilder({
      name,
      sourceDataMinio: {
        name: minioObjName,
        bucket,
        etag
      },
      status: status,
      path,
      description: description,
      source: sourceData,
      mapRef
    })).toPromise();
  }


  updateMap(id, name, status, description, map, schema, sourceDataType, config, sourceDataURL, dataModelURL, dataModelID, sourceData, sourceDataID, minioObjName, bucket, etag, path): any {
    if (schema?.$id) schema.$id = undefined

    if (Array.isArray(schema))
      schema = schema[0]

    return this.http.put<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/map", this.formDataBuilder({
      id,
      name,
      status,
      description,
      map: map,
      dataModel: schema,
      sourceDataType,
      config,
      sourceDataURL,
      dataModelURL,
      dataModelID,
      sourceDataID,
      path,
      sourceData,
      sourceDataMinio: {
        name: minioObjName,
        bucket,
        etag
      }
    })).toPromise();
  }

  updateSchema(name, mapRef, status, description, schema): any {
    if (schema?.$id) schema.$id = undefined

    return this.http.put<any[]>(this.config.data_model_mapper.default_mapper_base_url + "/dataModel", this.formDataBuilder({
      name,
      status: status,
      description: description,
      dataModel: schema ? schema[0] ? schema[0] : schema : schema,
      mapRef
    })).toPromise();
  }


  transform(sourceDataType: string, minioObjName, bucket, etag, source, mapData, dataModel, config): Promise<any[]> {

    if (dataModel && dataModel[0] && !dataModel.properties && !dataModel.allOf)//TODO dataModel must not be an array. Once you are sure of that, remove this
      dataModel = dataModel[0] //TODO dataModel must not be an array. Once you are sure of that, remove this
    if (dataModel?.$id) dataModel.$id = undefined

    return this.http.post<any[]>(this.config.data_model_mapper.default_mapper_url,
      this.formDataBuilder({
        sourceDataType,
        sourceDataMinio: {
          name: minioObjName,
          bucket: bucket,
          etag: etag,
        },
        sourceData: source.url ? undefined : source,
        sourceDataURL: source.url ? source.url : undefined,
        mapData,
        dataModel,
        config
      })).toPromise();
  }
}
