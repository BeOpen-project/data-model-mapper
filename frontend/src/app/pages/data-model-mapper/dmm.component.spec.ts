import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DMMComponent } from './dmm.component';
import { DMMService } from './dmm.service';
import { NbDialogService, NbToastrService, NbWindowModule, NbOverlayModule, NbThemeModule, NbCardModule, NbAccordionModule } from '@nebular/theme';
import { NgxConfigureService } from 'ngx-configure';
import { ActivatedRoute } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core'; // Assicurati di importare il pipe e il servizio di traduzione corretti
import { of } from 'rxjs';
import { ErrorDialogMapperRecordService } from '../error-dialog/error-dialog-mapperRecord.service';
import { createTranslateLoader } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DMMComponent', () => {
  let component: DMMComponent;
  let fixture: ComponentFixture<DMMComponent>;
  let dmmServiceSpy: jasmine.SpyObj<DMMService>;
  let dialogServiceSpy: jasmine.SpyObj<NbDialogService>;
  let toastrServiceSpy: jasmine.SpyObj<NbToastrService>;
  let configServiceSpy: jasmine.SpyObj<NgxConfigureService>;
  let errorDialogServiceSpy: jasmine.SpyObj<ErrorDialogMapperRecordService>; // Dichiarazione del mock del servizio
  let translateService: TranslateService; // Dichiarazione del servizio di traduzione

  beforeEach(async () => {
    const dmmSpy = jasmine.createSpyObj('DMMService', ['getMaps', 'getSchemas', 'getSources', 'getConfig', 'transform']);
    const dialogSpy = jasmine.createSpyObj('NbDialogService', ['open']);
    const toastrSpy = jasmine.createSpyObj('NbToastrService', ['show']);
    const configSpy = jasmine.createSpyObj('NgxConfigureService', [], { config: {} });
    const errorDialogSpy = jasmine.createSpyObj('ErrorDialogMapperRecordService', ['openErrorDialog']); // Creazione del mock del servizio

    await TestBed.configureTestingModule({
      imports: [
        /*TranslateModule.forChild(
          {
            loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateLoader),
              deps: [HttpClient]
            }
          }
        ),*/
        TranslateModule.forRoot(),
        NbWindowModule.forRoot(),
        NbOverlayModule.forRoot(),
        BrowserAnimationsModule,
        NbThemeModule.forRoot(),
        NbCardModule, // Importa NbCardModule
        NbAccordionModule // Importa NbAccordionModule
      ],
      declarations: [
        DMMComponent,
        TranslatePipe // Dichiarazione del pipe di traduzione
      ],
      providers: [
        TranslateService,
        { provide: DMMService, useValue: dmmSpy },
        { provide: NbDialogService, useValue: dialogSpy },
        { provide: NbToastrService, useValue: toastrSpy },
        { provide: NgxConfigureService, useValue: configSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
        { provide: ErrorDialogMapperRecordService, useValue: errorDialogSpy }, // Fornitura del mock del servizio
        TranslateService // Fornitura del servizio di traduzione
      ]
    }).compileComponents();

    dmmServiceSpy = TestBed.inject(DMMService) as jasmine.SpyObj<DMMService>;
    dialogServiceSpy = TestBed.inject(NbDialogService) as jasmine.SpyObj<NbDialogService>;
    toastrServiceSpy = TestBed.inject(NbToastrService) as jasmine.SpyObj<NbToastrService>;
    configServiceSpy = TestBed.inject(NgxConfigureService) as jasmine.SpyObj<NgxConfigureService>;
    errorDialogServiceSpy = TestBed.inject(ErrorDialogMapperRecordService) as jasmine.SpyObj<ErrorDialogMapperRecordService>; // Inizializzazione del mock del servizio
    translateService = TestBed.inject(TranslateService); // Inizializzazione del servizio di traduzione
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMMComponent);
    component = fixture.componentInstance;
    dmmServiceSpy.getMaps.and.returnValue(Promise.resolve([]));
    dmmServiceSpy.getSchemas.and.returnValue(Promise.resolve([]));
    dmmServiceSpy.getSources.and.returnValue(Promise.resolve([]));
    dmmServiceSpy.getConfig.and.returnValue(Promise.resolve({}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Altri test possono essere aggiunti qui...

});
