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
import mock from '../../../assets/tests/mock.js';
import { By } from '@angular/platform-browser';
//import { FormsModule } from '@angular/forms';

describe('DMMComponent', () => {
  let component: DMMComponent;
  let fixture: ComponentFixture<DMMComponent>;
  let dmmServiceSpy: jasmine.SpyObj<DMMService>;
  let dialogServiceSpy: jasmine.SpyObj<NbDialogService>;
  let toastrServiceSpy: jasmine.SpyObj<NbToastrService>;
  let configServiceSpy: jasmine.SpyObj<NgxConfigureService>;
  let errorDialogServiceSpy: jasmine.SpyObj<ErrorDialogMapperRecordService>;
  let translateService: TranslateService;

  beforeEach(async () => {
    const dmmSpy = jasmine.createSpyObj('DMMService', ['getMaps', 'getSchemas', 'getSources', 'getConfig', 'transform']);
    const dialogSpy = jasmine.createSpyObj('NbDialogService', ['open']);
    const toastrSpy = jasmine.createSpyObj('NbToastrService', ['show']);
    const configSpy = jasmine.createSpyObj('NgxConfigureService', [], { config: {} });
    const errorDialogSpy = jasmine.createSpyObj('ErrorDialogMapperRecordService', ['openErrorDialog']);

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
        NbCardModule,
        //FormsModule,
        NbAccordionModule,
      ],
      declarations: [DMMComponent, TranslatePipe],
      providers: [
        TranslateService,
        { provide: DMMService, useValue: dmmSpy },
        { provide: NbDialogService, useValue: dialogSpy },
        { provide: NbToastrService, useValue: toastrSpy },
        { provide: NgxConfigureService, useValue: configSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
        { provide: ErrorDialogMapperRecordService, useValue: errorDialogSpy },
        TranslateService,
      ],
    }).compileComponents();

    dmmServiceSpy = TestBed.inject(DMMService) as jasmine.SpyObj<DMMService>;
    dialogServiceSpy = TestBed.inject(NbDialogService) as jasmine.SpyObj<NbDialogService>;
    toastrServiceSpy = TestBed.inject(NbToastrService) as jasmine.SpyObj<NbToastrService>;
    configServiceSpy = TestBed.inject(NgxConfigureService) as jasmine.SpyObj<NgxConfigureService>;
    errorDialogServiceSpy = TestBed.inject(ErrorDialogMapperRecordService) as jasmine.SpyObj<ErrorDialogMapperRecordService>;
    translateService = TestBed.inject(TranslateService);
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(DMMComponent);
    component = fixture.componentInstance;

    dmmServiceSpy.getMaps.and.returnValue(Promise.resolve([mock.maps]));
    dmmServiceSpy.getSchemas.and.returnValue(Promise.resolve([mock.schemas]));
    dmmServiceSpy.getSources.and.returnValue(Promise.resolve([mock.sources]));
    dmmServiceSpy.getConfig.and.returnValue(Promise.resolve(mock.config));

    //await component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set source', () => {
    component.source.inputType = 'CSV';
    expect(component.source.inputType).toBe('CSV');
  });

  it('should simulate click event on button', () => {
    spyOn(component.source, 'onUpdatePathForDataMap');

    const buttonDebugElement = fixture.debugElement.query(By.css('#onUpdatePathForDataMap'));
    buttonDebugElement.triggerEventHandler('click', null);

    expect(component.source.onUpdatePathForDataMap).toHaveBeenCalled();
  });

  it('preview', () => {
    spyOn(component, 'testMapperRecord');

    const buttonDebugElement = fixture.debugElement.query(By.css('#preview'));
    //console.log(component)
    buttonDebugElement.triggerEventHandler('click', null);
    //console.log(component)

    expect(component.testMapperRecord).toHaveBeenCalled();
  });

  // Other tests...
});
