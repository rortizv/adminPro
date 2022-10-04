import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent {

  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  @Input('valor') progreso: number = 40;
  @Input() btnClass: string = 'btn-primary';


  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor( valor: number ) {

    if ( this.progreso >= 100 && valor >= 0 ) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if ( this.progreso <= 0 && valor < 0 ) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.valorSalida.emit( this.progreso );
    return this.progreso = this.progreso + valor;
  }

  onChange( nuevoValor: number ){
    
    if( nuevoValor >= 100 ) {
      this.progreso = 100;
    } else if ( nuevoValor <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

    

    this.valorSalida.emit( this.progreso );
  }

}
