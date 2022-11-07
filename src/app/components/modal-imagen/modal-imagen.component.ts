import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  constructor(public modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalImagenService.cerrarModal();
  }

}