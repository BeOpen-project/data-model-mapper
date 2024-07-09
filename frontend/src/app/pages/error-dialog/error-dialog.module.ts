import { NgModule } from '@angular/core';
import { ErrorDialogComponent } from './error-dialog.component';
import { NbCardModule,  NbAccordionModule } from '@nebular/theme';
import { ErrorDialogService } from './error-dialog.service';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorDialogMapperRecordComponent } from './error-dialog-mapperRecord.component';
import { ErrorDialogMapperRecordService } from './error-dialog-mapperRecord.service';

@NgModule({
  imports: [TranslateModule.forChild({}),NbAccordionModule, CommonModule, NbCardModule, TranslateModule.forChild()],
  declarations: [ErrorDialogComponent,  ErrorDialogMapperRecordComponent,],
  exports: [ErrorDialogComponent,  ErrorDialogMapperRecordComponent],
  entryComponents: [ErrorDialogComponent,  ErrorDialogMapperRecordComponent],
  providers: [ErrorDialogService, ErrorDialogMapperRecordService, Location],
})
export class ErrorDialogModule {}
