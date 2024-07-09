export interface AppConfig {
  serviceRegistry: {
    url: string;
  };
  system: System;
  i18n: I18n;
  data_model_mapper: DataModelMapper;
}

export interface System {
  country: string;
  //sdkUrl: string;
  checkConsentAtOperator: boolean;
  dmmGuiUrl: string;
  editorSchemaPath: string;
  editorSchemaName: string;
  auth: Auth;
  mailTo:string;
  docsUrl:string;
  detailedErrors: boolean;
}

export interface Auth {
  idmHost: string;
  clientId: string;
  disableAuth: string;
  authProfile: string;
  authRealm: string;
}

export interface I18n {
  locale: string;
  languages: string[];
}

export interface DataModelMapper {
  alwaysPromptSaveSchema: any;
  alwaysPromptSaveSource: any;
  minioBuckets: any;
  minioCache: any;
  default_mapper_base_url: string;
  default_mapper_url: string,
  default_map_ID: string,
  connect: boolean
}
