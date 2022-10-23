import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy  {

  public title: string = '';
  public titleSubs$: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.titleSubs$ = this.getArgsRoute()
                        .subscribe( ({title}) => {
                          this.title = title;
                          document.title = `Admin - ${title}`;
                        });
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getArgsRoute() {
    return this.router.events
      .pipe(
        filter( (event: ActivationEnd) => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
        map( (event: ActivationEnd) => event.snapshot.data )
      )
  }


}

