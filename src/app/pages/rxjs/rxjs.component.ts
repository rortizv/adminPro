import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter, take } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 
    this.intervalSubs = this.retornaIntervalo().subscribe(console.log)
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {

    return interval(500)
            .pipe(
              map( valor => valor + 1 ),
              filter( valor => (valor % 2 === 0) ? true : false ),
              take(10),
            );
        
  }

  returnObservable(): Observable<number> {

    let i = -1;

    return new Observable<number>( observer => {

      const interval = setInterval( () => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('index i llegó al valor de 2');
        }
      }, 1000)

    });

  }

}