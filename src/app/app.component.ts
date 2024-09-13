import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileItem } from '../models/file.item.model';
import { FILE_LIST } from '../data/file.storage';
import { CommonModule } from '@angular/common';
import { FileListComponentComponent } from './file-list-component/file-list-component.component';
import { FileFormComponentComponent } from './file-form-component/file-form-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FileListComponentComponent, FileFormComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  files: FileItem[] = FILE_LIST;
  title = 'file-management';
}
