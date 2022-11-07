import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public pagDesde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.pagDesde)
      .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
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

  buscar(termino: string) {
    
    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    return this.busquedasService.buscar('usuarios', termino)
      .subscribe(resp => {
        this.usuarios = resp;
      });
  }

  eliminarUsuario( usuario: Usuario){

    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire({
        title: 'Error',
        text: 'No puede borrarse a sí mismo'
      });
    }

    return Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está a punto de borrar al usuario: ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#1D7E34',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp => {
            Swal.fire(
              '¡Eliminado!',
              `El usuario ${usuario.nombre} ha sido eliminado satisfactoriamente.`,
              'success'
            );
            this.cargarUsuarios();
          });
      }
    })
  }

}
