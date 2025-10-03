export interface AuditLog {
  linkedServicesCount: number;
  givenConsentsCount: number;
  totalProcessedPersonalDataCount: number;
  purposeCategoryCount: Record<string, number>;
  legalBasisCount: Record<string, number>;
}

export interface EventLog {
  created: Date;
  accountId: string;
  legalBasis: string;
  message: string;
  type: EventType;
}

export enum EventType {
  Consent = 'Consent',
  ServiceLink = 'ServiceLink',
  DataProcessing = 'DataProcessing',
}

export interface ServiceLinkEventLog extends EventLog {
  serviceId: string;
  serviceName: string;
  serviceUri: string;
  action: ServiceLinkActionType;
}

export interface ConsentEventLog extends EventLog {
  sinkId: string;
  sourceId: string;
  action: ConsentActionType;
  consentRecordId: string;
}

export enum ConsentActionType {
  GIVE = 'Give',
  UPDATE = 'Update',
  DISABLE = 'Disable',
  ACTIVATE = 'Activate',
  WITHDRAW = 'Withdraw',
  SEND = 'Send',
}

export enum ServiceLinkActionType {
  CREATE = 'Create',
  DISABLE = 'Disable',
  DELETE = 'Delete',
}

export interface DateRange {
  start: Date;
  end: Date;
}
