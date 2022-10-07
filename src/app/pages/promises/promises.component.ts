import { Component, OnInit, resolveForwardRef } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    })

  }

  getUsuarios() {

    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json() )
        .then( body => console.log(body.data) );
    });

  }

}
