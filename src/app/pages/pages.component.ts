import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
//import { NbAccessChecker } from '@nebular/security';
import { NbMenuItem } from '@nebular/theme';

import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit, OnDestroy {
  public menu: NbMenuItem[];
  private hideServicesMenu: boolean;
  private hideConsentsMenu: boolean;
  private hideManageMenu: boolean;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private translateService: TranslateService, private cdr: ChangeDetectorRef) { } //, private accessChecker: NbAccessChecker) { }

  ngOnInit(): void {
    /*
    this.accessChecker
      .isGranted('view', 'services')
      .pipe(take(1))
      .subscribe((granted: boolean) => {
        this.hideServicesMenu = !granted;
      });

    this.accessChecker
      .isGranted('view', 'consents')
      .pipe(take(1))
      .subscribe((granted: boolean) => {
        this.hideManageMenu = !granted;
      });

      this.accessChecker
      .isGranted('view', 'manage')
      .pipe(take(1))
      .subscribe((granted: boolean) => {
        this.hideManageMenu = !granted;
      });*/

    const MENU_ITEMS: NbMenuItem[] = [
      {
        title: 'general.menu.home',
        icon: 'home-outline',
        link: '/pages/home',
      },
      {
        title: 'general.menu.map_records',
        icon: 'list-outline',
        link: '/pages/mapper-records',
      },
      {
        title: 'general.menu.editor',
        icon: 'edit-outline',
        link: '/pages/dmm-editor',
      },
    ];

    // if put on constructor it will doing twice when refresh a page.
    this.menu = this.translate(MENU_ITEMS);
    this.translateService.onLangChange.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.menu = this.translate(MENU_ITEMS);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  translate(menuItems: NbMenuItem[]): NbMenuItem[] {
    return menuItems.map((item) => {
      return {
        ...item,
        title: this.translateService.instant(item.title) as string,
        // children: item.children.map((child) => {
        //   return { ...child, title: this.translateService.instant(child.title) as string };
        // }),
      } as NbMenuItem;
    });
  }
}
