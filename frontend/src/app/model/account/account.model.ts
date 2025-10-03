export interface Account {
  username: string;
  account_info: AccountInfo;
  language: string;
  notification: AccountNotificationEnum[];
}
export interface AccountInfo {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
}

export enum AccountNotificationEnum {
  Home = 'home',
  Email = 'EMAIL',
  Phone = 'PHONE',
}
