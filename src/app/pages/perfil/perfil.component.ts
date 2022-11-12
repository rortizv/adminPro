import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imgUpload: File;
  public imgTemp: any = null;

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) { 
                this.usuario = usuarioService.usuario;
              }

  ngOnInit(): void {
    this.perfilForm = this.formBuilder.group({
      nombre: [ this.usuario.nombre, Validators.required ],
      email: [ this.usuario.email, [Validators.required, Validators.email] ]
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe( () => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        
          Swal.fire("Usuario actualizado!", "Has actualizado tu usuario satisfactoriamente", "success");
        }, (err) => {
          Swal.fire("ERROR", "Ha ocurrido un error al intentar actualizar el usuario", "error");
        });
  }

  cambiarImagen(file: any) {
    this.imgUpload = file;

    if (!file) { return; }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imgUpload, 'usuarios', this.usuario.uid!)
      .then( img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada satisfactoriamente', 'success');
      }).catch( err => {
        Swal.fire('Error', err.error.msg, 'error');
      })
  }

}
