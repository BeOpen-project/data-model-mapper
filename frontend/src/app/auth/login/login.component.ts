import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NgxConfigureService } from 'ngx-configure';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppConfig, System } from '../../model/appConfig';
import { Subject } from 'rxjs';
import { NbAuthOAuth2JWTToken, NbAuthService } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';
import { ErrorResponse } from '../../model/errorResponse';
import { OidcJWTToken } from '../model/oidc';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent {//implements AfterViewInit, OnDestroy {
  private environment: System;
  serviceEditorUrl: string;
  locale: string;

  @ViewChild('errorDialog', { static: false })
  private errorDialogTemplateRef: TemplateRef<unknown>;

  private destroy$ = new Subject<void>();
  token: NbAuthOAuth2JWTToken;

  private queryParams: Params;

  constructor(
    private configService: NgxConfigureService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: NbAuthService,
    private activatedRoute: ActivatedRoute,
    private dialogService: NbDialogService
  ) {
    this.serviceEditorUrl = (this.configService.config as AppConfig).system.dmmGuiUrl;
    this.locale = (this.configService.config as AppConfig).i18n.locale;
    this.queryParams = this.activatedRoute.snapshot.queryParams;
    this.environment = (this.configService.config as AppConfig).system;
  }

  async ngAfterViewInit(): Promise<void> {
    if (!(await this.authService.isAuthenticatedOrRefresh().toPromise())) {
      if (!(await this.authService.getToken().toPromise()).isValid() && !this.queryParams['code'])
        sessionStorage.setItem('queryParamsBeforeLogin', JSON.stringify(this.queryParams));
      const authResult = await this.authService.authenticate((this.configService.config as AppConfig).system.auth.authProfile).toPromise();

      if (authResult.isSuccess() && authResult.getToken()?.isValid()) {
        this.completeLogin(authResult.getToken() as OidcJWTToken);
      } else if (authResult.getErrors().length > 0)
        this.openDialog(this.errorDialogTemplateRef, { error: { message: authResult.getErrors().toString() } });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  completeLogin = (token: OidcJWTToken): void => {
    try {
      // Get Idm User Details to create the associated Account
      const tokenPayload = token.getAccessTokenPayload();

      localStorage.setItem('accountId', tokenPayload.preferred_username);
      localStorage.setItem('accountEmail', tokenPayload.email);

      /*
       * Close Login Popup and propagates query Params saved before Login, and eventually append redirectAfterLogin to the Base path
       */
      this.closeLoginPopup();
    } catch (err) {
      console.error(err.message);
      this.openDialog(this.errorDialogTemplateRef, {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error: err as ErrorResponse,
      });
    }
  };

  cancel = (): void => {
    window.close();
  };

  closeLoginPopup = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const queryParamsBeforeLogin = JSON.parse(sessionStorage.getItem('queryParamsBeforeLogin')) as Record<string, string>;
    const redirectAfterLogin = queryParamsBeforeLogin?.redirectAfterLogin;
    sessionStorage.removeItem('queryParamsBeforeLogin');
    delete queryParamsBeforeLogin?.redirectAfterLogin;

    if (redirectAfterLogin) {
      const queryString = this.printQueryParamsString(queryParamsBeforeLogin);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      window.parent.document.location.href = this.serviceEditorUrl + redirectAfterLogin + (queryString ? queryString : '');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    } else window.parent.document.location.href = this.serviceEditorUrl;

    window.close();
  };

  openDialog = (dialogTemplate: TemplateRef<unknown>, ctx: unknown): void => {
    this.dialogService.open(dialogTemplate, {
      context: ctx,
      hasScroll: false,
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  };

  printQueryParamsString = (queryParams: Record<string, string>): string => {
    if (Object.keys(queryParams).length > 0)
      return Object.entries<string>(queryParams).reduce((acc, entry) => {
        return `${acc}&${entry[0]}=${entry[1]}`;
      }, '?');
    else return undefined;
  };

  public login = async (): Promise<void> => {
    // Propagates (if any) queryParams, in order to be propagated also in the redirected URL after authentication
    const queryParams = this.route.snapshot.queryParams;
    let queryString = '';
    if (queryParams && Object.keys(queryParams).length > 0)
      queryString = Object.entries<string>(queryParams).reduce((acc, entry) => {
        return `${acc}&${entry[0]}=${entry[1]}`;
      }, '');

    await this.ngAfterViewInit();

    //let popupRoute = '..//loginPopup' + '?' + queryString
    //this.router.navigate(['../loginPopup', { relativeTo: this.route }])//, queryParams: { parametro1: 'valore1', parametro2: 'valore2' } }]);
    //this.router.navigate['loginPopup']
  };

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  popupCenter = ({ url, title, w, h }) => {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(
      url,
      title,
      `
      toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no,
      width=${w / systemZoom},
      height=${h / systemZoom},
      top=${top + 50},
      left=${left}
      `
    );

    if (window.focus) newWindow.focus();
  };
}
