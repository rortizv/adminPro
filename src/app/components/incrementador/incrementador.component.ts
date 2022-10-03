import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent {

  @Input('valor') progreso: number = 40;
  @Input() btnClass: string = 'btn btn-primary';
  @Output('valor') modificaValor: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor: number) {

    if(this.progreso >= 100 && valor >= 0) {
      this.modificaValor.emit(100);
      return this.progreso = 100;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.modificaValor.emit(0);
      return this.progreso = 0;
    }

    this.modificaValor.emit(this.progreso);
    return this.progreso = this.progreso + valor;
  }

}
