import { Component, EventEmitter, Output } from '@angular/core';
import { FILE_LIST, OWNERS } from '../../data/file.storage';
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListComponent } from "../list/list.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ListComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  @Output() cerrarFormulario = new EventEmitter<void>();

  fileType = FileType;

  fileOwner: FileOwner[] = OWNERS;

  fileItem: FileItem[] = FILE_LIST;

  cantDuenios: number[] = [];
  name: string = '';
  creation: Date = new Date();
  selectedCarpeta: any;
  selectedTipo: any;
  selectedDuenio: FileOwner[] = [];


  guardar() {
    const nuevoArchivo: FileItem = {
      id: '',
      name: this.name,
      creation: this.creation,
      type: this.selectedTipo,
      owners: this.selectedDuenio
    };
    this.fileItem.push(nuevoArchivo);
  }

  agregarDuenio() {
    this.cantDuenios.push(1);
  }
  
  volver() {
    this.cerrarFormulario.emit();
  }

}
