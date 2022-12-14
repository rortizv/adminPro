import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public pagDesde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.imagenCambiada
      .pipe( delay(100) )
      .subscribe( img => this.cargarUsuarios());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
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
        text: 'No puede borrarse a s?? mismo'
      });
    }

    return Swal.fire({
      title: '??Borrar usuario?',
      text: `Est?? a punto de borrar al usuario: ${usuario.nombre}`,
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
              '??Eliminado!',
              `El usuario ${usuario.nombre} ha sido eliminado satisfactoriamente.`,
              'success'
            );
            this.cargarUsuarios();
          });
      }
    })
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => {
        Swal.fire(
          'Role modificado!',
          'Ha modificado el Role de usuario satisfactoriamente',
          'success'
        )
      });
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img);
  }

}
