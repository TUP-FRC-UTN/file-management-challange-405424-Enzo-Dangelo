import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { FileServiceService } from '../file-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-form-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './file-form-component.component.html',
  styleUrl: './file-form-component.component.css'
})
export class FileFormComponentComponent implements OnInit {
  @Output() fileAdded = new EventEmitter<void>();

  fileForm: FormGroup;
  FileType = FileType;
  folders: FileItem[] = [];
  owners: FileOwner[] = [];
  selectedOwners: FileOwner[] = [];

  constructor(private fb: FormBuilder, private fileService: FileServiceService) {
    this.fileForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      type: [FileType.FILE, Validators.required],
      parentId: [''],
    });
  }

  ngOnInit() {
    this.loadFolders();
    this.loadOwners();
  }

  loadFolders() {
    this.fileService.getFolders().subscribe(folders => {
      this.folders = folders;
    });
  }

  loadOwners() {
    this.fileService.getOwners().subscribe(owners => {
      this.owners = owners;
    });
  }

  onOwnerChange(event: Event, owner: FileOwner) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedOwners.push(owner);
    } else {
      this.selectedOwners = this.selectedOwners.filter(o => o.name !== owner.name);
    }
  }

  onSubmit() {
    if (this.fileForm.valid) {
      const newFile = {
        ...this.fileForm.value,
        owners: this.selectedOwners,
        creation: new Date(this.fileForm.value.date)
      };
      this.fileService.addFile(newFile).subscribe(() => {
        this.fileAdded.emit();
        this.fileForm.reset({
          type: FileType.FILE,
          parentId: ''
        });
        this.selectedOwners = [];
      });
    }
  }

}
