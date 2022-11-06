import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public pagDesde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.pagDesde)
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.cargando = false;
      })
  }

  cambiarPagina(valor: number) {
    this.pagDesde += valor;

    if (this.pagDesde < 0) {
      this.pagDesde = 0;
    } else if (this.pagDesde >= this.totalUsuarios) {
      this.pagDesde -=  valor;
    }

    this.cargarUsuarios();
  }

}
