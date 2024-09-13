import { Component, OnInit } from '@angular/core';
import { FileItem, FileType } from '../../models/file.item.model';
import { FileServiceService } from '../file-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../truncate.pipe';
import { FileFormComponentComponent } from '../file-form-component/file-form-component.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-file-list-component',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe, FileFormComponentComponent],
  templateUrl: './file-list-component.component.html',
  styleUrl: './file-list-component.component.css'
})
export class FileListComponentComponent implements OnInit {
  
  items: FileItem[] = [];
  FileType = FileType;
  showForm = false;

  constructor(private fileService: FileServiceService) {}

  ngOnInit() {
    this.loadItems();
  }

  get sortedItems() {
    return this.items.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === FileType.FOLDER ? -1 : 1;
    });
  }

  get selectedItems() {
    return this.items.filter(item => item.selected);
  }

  loadItems() {
    this.fileService.getFiles().subscribe(files => {
      this.items = files.map(file => ({ ...file, selected: false }));
    });
  }

  onFileAdded() {
    this.loadItems();
    this.showForm = false;
  }

  onDelete(item: FileItem) {
    this.deleteItems([item]);
  }

  onDeleteAction() {
    const selectedItems = this.selectedItems;

    if (selectedItems.length === 0) {
      alert('No hay elementos seleccionados para borrar');
      return;
    }

    if (selectedItems.length === 1) {
      this.deleteItems(selectedItems);
    } else {
      const confirmMessage = `¿Esta seguro de que quieres borrar ${selectedItems.length} elementos?`;
      if (confirm(confirmMessage)) {
        this.deleteItems(selectedItems);
      }
    }
  }

  deleteItems(items: FileItem[]) {
    if (items.length === 0) return;
    
    const deleteObservables = items.map(item => this.fileService.deleteFile(item.id));
    forkJoin(deleteObservables).subscribe(() => {
      this.loadItems();
    });
  }

  toggleAllSelection(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.items.forEach(item => item.selected = isChecked);
  }
}
