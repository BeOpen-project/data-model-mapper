import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgxConfigureService } from 'ngx-configure';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { System, AppConfig } from '../../model/appConfig';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { DMMService } from '../data-model-mapper/dmm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsComponent } from './actions/actions.component';
import { DetailsComponent } from './details/details.component';
import { StatusComponent } from './status/status.component';
import { TestDmmEditorComponent } from './testDmmEditor/testDmmEditor.component';
//import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input() value;
  @Output() updateResult = new EventEmitter<unknown>();
  schemaDir: string;
  loading = false;
  pageSize = 7
  public isNotNew = false;
  private systemConfig: System;
  private systemLocale: string;
  private config: AppConfig;
  public serviceId: string;
  public connectorId: string;
  public serviceName: string;
  public readOnly = false;
  private recordLabel: string;
  private descriptionLabel: string;
  private actionsLabel: string;
  private detailsLabel: string;
  private statusLabel: string;
  public settings: Record<string, unknown>;
  private locale: string;
  public source: LocalDataSource = new LocalDataSource();
  private mapRecords: any[];
  private unsubscribe: Subject<void> = new Subject();
  test: any;
  currentTheme: any;
  card = true

  constructor(
    private router: Router,
    private errorService: ErrorDialogService,
    private dmmService: DMMService,
    private translate: TranslateService,
    private configService: NgxConfigureService,
    private dialogService: NbDialogService,
    private themeService: NbThemeService,
    public route: ActivatedRoute //@Inject(DOCUMENT) public document: Document,
  ) {
    //this.themeService.changeTheme('default');
    this.test = this.route.snapshot.queryParams['testing'];
    this.config = this.configService.config as AppConfig;
    this.systemConfig = this.config.system;
    this.systemLocale = this.config.i18n.locale;
    this.settings = this.loadTableSettings();
    this.locale = (this.configService.config as AppConfig).i18n.locale; // TODO change with user language preferences
    this.schemaDir =
      (this.systemConfig.dmmGuiUrl.includes('localhost') ? '' : this.systemConfig.dmmGuiUrl) +
      this.systemConfig.editorSchemaPath +
      '/' +
      this.systemLocale +
      '/' +
      this.systemConfig.editorSchemaName;
    this.loading = true;
  }

  automated() {
    this.dialogService.open(TestDmmEditorComponent, {
      //context: {dialog : true}
    });
  }

  themeChanged(themeName: string) {
    console.log('Changing theme to:', themeName);
  }

  onPageSizeChange(newSize: number) {
    let page = Math.round(this.source.getPaging().page * this.source.getPaging().perPage / newSize)
    this.source.setPaging(page, newSize, true);
    console.log(this.source.getPaging().page)
    //this.loadTableSettings(); // ricarica settings con nuovo pageSize
  }

  async ngOnInit() {
    try {
      this.mapRecords = await this.dmmService.getMaps();
      void this.source.load(this.mapRecords);
    } catch (error) {
      console.error(error);
      if (error.status == 0 || error.error.status == 0) {
        error.statusText = undefined;
        error.message = error.error.message = 'Unable to reach server';
      }
      this.errorService.openErrorDialog(error);
    }
    //this.onPageSizeChange(5);
    this.source.setPaging(1, 7, true);
    console.log('source paging set to 1, 5');
    this.themeService
      .onThemeChange()
      .subscribe((themeName) => {
        console.log('Theme changed to:', themeName);
        this.currentTheme = themeName
        if (themeName.name === 'mold' || themeName.name === 'mold2') {
          this.card = true;
         }
        else {
          this.card = false;
         }
        //this.cardChange(this.card);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  async addNew(): Promise<void> {
    try {
      this.router.navigate(['/pages/dmm-editor']);
    } catch (error) {
      console.error('error in addNew');
      console.error('error:<\n', error, '>\n');
      this.errorService.openErrorDialog(error);
    }
  }

  loadTableSettings(): Record<string, unknown> {
    this.recordLabel = this.translate.instant('general.dmm.record') as string;
    this.descriptionLabel = this.translate.instant('general.dmm.description') as string;
    this.actionsLabel = this.translate.instant('general.dmm.actions') as string;
    this.detailsLabel = this.translate.instant('general.dmm.details') as string;
    this.statusLabel = this.translate.instant('general.dmm.status') as string;

    return {
      mode: 'external',
      attr: {
        class: 'table table-bordered',
      },
      pagination: {
        perPage: 7, // variabile che puoi aggiornare dinamicamente
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
        editService: false,
      },
      columns: {
        name: {
          title: this.recordLabel,
          type: 'text',
          width: '25%',
          sortDirection: 'asc',
          valuePrepareFunction: (cell, row) => row.name,
        },
        description: {
          title: this.descriptionLabel,
          editor: {
            type: 'textarea',
          },
          width: '60%',
          valuePrepareFunction: (cell, row) => row.description,
        },
        /*
        details: {
          title: this.detailsLabel,
          sort: false,
          filter: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row) => row,
          renderComponent: DetailsComponent,
        },*/
        status: {
          title: this.statusLabel,
          sort: false,
          filter: false,
          width: '5%',
          type: 'custom',
          valuePrepareFunction: (cell, row) => row.status,
          renderComponent: StatusComponent,
        },
        actions: {
          title: this.actionsLabel,
          sort: false,
          width: '25%',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (cell, row) => row,
          renderComponent: ActionsComponent,
          onComponentInitFunction: (instance) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
            instance?.updateResult?.pipe(takeUntil(this.unsubscribe)).subscribe(() => this.ngOnInit());
          },
        },
      },
    };
  }

  resetfilters(): void {
    this.source.reset();
  }
}
