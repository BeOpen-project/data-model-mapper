import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Location } from '@angular/common';
import { AppConfig } from '../../model/appConfig';
import { NgxConfigureService } from 'ngx-configure';
@Component({
  selector: 'error-dialog',
  templateUrl: 'error-dialog.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent implements OnInit {
  public error;
  appConfig: AppConfig;

  constructor(private configService: NgxConfigureService, public ref: NbDialogRef<unknown>, private _location: Location) {
    //, private loginService: LoginService) {
    this.appConfig = this.configService.config as AppConfig;
  }

  ngOnInit(): void {
    document.getElementsByTagName('html')[0].className = '';
  }

  closeModal(error: { [key: string]: { cause?: string } }): void {
    //if (error.error?.cause === 'it.eng.opsi.cape.exception.AuditLogNotFoundException' || error.status === 0 || error.status === 401)
    //if (error.status == 401)
    //void this.loginService.logout().catch((error) => console.log(error));
    // else
    //   this.backClicked();
    this.ref.close();
  }

  backClicked(): void {
    this._location.back();
  }
}
