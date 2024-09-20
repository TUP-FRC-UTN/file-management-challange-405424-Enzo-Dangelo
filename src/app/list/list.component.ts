import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { FILE_LIST, OWNERS } from '../../data/file.storage';
import { FormComponent } from "../form/form.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FormComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  mostrarFormulario: boolean = false;
  fileItems: FileItem[] = FILE_LIST;
  FileTypes = FileType;
  selectedItems: Set<FileItem> = new Set();

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  ocultarFormulario() {
    this.mostrarFormulario = false;
  }

  toggleSelection(item: FileItem) {
    if (this.selectedItems.has(item)) {
      this.selectedItems.delete(item);
    } else {
      this.selectedItems.add(item);
    }
  }

  isSelected(item: FileItem): boolean {
    return this.selectedItems.has(item);
  }

  borrar() {
    if (this.selectedItems.size === 0) {
      alert('Por favor, seleccione al menos un elemento para borrar.');
      return;
    }

    if (this.selectedItems.size === 1) {
      this.borrarSeleccionados();
    } else {
      const confirmacion = confirm(`¿Está seguro que desea borrar ${this.selectedItems.size} elementos?`);
      if (confirmacion) {
        this.borrarSeleccionados();
      }
    }
  }

  private borrarSeleccionados() {
    this.fileItems = this.fileItems.filter(item => !this.selectedItems.has(item));
    this.selectedItems.clear();
  }

}
