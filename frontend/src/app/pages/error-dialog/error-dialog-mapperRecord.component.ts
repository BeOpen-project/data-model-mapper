import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Location } from '@angular/common';
@Component({
  selector: 'error-dialog',
  templateUrl: 'error-dialog-mapperRecord.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogMapperRecordComponent implements OnInit {
  public error;

  constructor(public ref: NbDialogRef<unknown>, private _location: Location) {} //, private loginService: LoginService) {}
  ngOnInit(): void {
    document.getElementsByTagName('html')[0].className = '';
  }

  closeModal(error: { [key: string]: { cause?: string } }): void {
    //if (error.error?.cause === 'it.eng.opsi.cape.exception.AuditLogNotFoundException' || (error.status as any) === 401)
    //void this.loginService.logout().catch((error) => console.log(error));
    // else
    //   this.backClicked();
    this.ref.close();
  }

  backClicked(): void {
    this._location.back();
  }
}
