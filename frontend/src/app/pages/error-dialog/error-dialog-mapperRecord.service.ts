import { Injectable } from '@angular/core';
import { ErrorDialogMapperRecordComponent } from './error-dialog-mapperRecord.component';
import { NbDialogService } from '@nebular/theme';

@Injectable()
export class ErrorDialogMapperRecordService {
  constructor(private modalService: NbDialogService) { }

  openErrorDialog(error: unknown): void {
    this.modalService.open(ErrorDialogMapperRecordComponent, {
      context: {
        error: error,
      },
      hasScroll: false,
      closeOnBackdropClick: false,
      closeOnEsc: false,
    }).onClose.subscribe(() => {
      document.getElementsByTagName('html')[0].className = ""
    });
  }
}
