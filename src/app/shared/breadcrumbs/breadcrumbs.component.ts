import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute, NavigationEnd } from '@angular/router';
import type { Data, Event } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: [ './breadcrumbs.component.css' ],
})
export class BreadcrumbsComponent implements OnDestroy {
  public title: string = '';
  public titleSubs$: Subscription;

  private readonly _routeData$: Observable<Data>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router, 
  ) {
    this._routeData$ = this.router.events.pipe(
      filter((ev: Event): ev is NavigationEnd => ev instanceof NavigationEnd),
      map((_: NavigationEnd): ActivatedRoute => {
        let route = this.activatedRoute;
        // Traverse over the state tree to find the last activated route
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route: ActivatedRoute): boolean => route.outlet === 'primary'),
      mergeMap((route: ActivatedRoute): Observable<Data> => route.data),
    );

    this.titleSubs$ = this._routeData$.subscribe(({ title }) => {
      this.title = title;
      document.title = `Admin - ${title}`;
    });
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }
}