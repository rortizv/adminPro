import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imgUpload: File;
  public imgTemp: any = null;

  constructor(public modalImagenService: ModalImagenService,
              private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imgUpload, tipo, id)
      .then( img => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada satisfactoriamente', 'success');
        this.modalImagenService.imagenCambiada.emit(img);
        this.cerrarModal();
      }).catch( err => {
        Swal.fire('Error', err.error.msg, 'error');
      })
  }

}