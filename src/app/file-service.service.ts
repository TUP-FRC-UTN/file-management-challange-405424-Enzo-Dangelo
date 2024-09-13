import { Injectable } from '@angular/core';
import { FileItem, FileOwner, FileType } from '../models/file.item.model';
import { Observable, of } from 'rxjs';
import { FILE_LIST, OWNERS } from '../data/file.storage';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  private files: FileItem[] = FILE_LIST;
  private owners: FileOwner[] = OWNERS;

  getFiles(): Observable<FileItem[]> {
    return of(this.files);
  }

  getFolders(): Observable<FileItem[]> {
    return of(this.files.filter(file => file.type === FileType.FOLDER));
  }

  getOwners(): Observable<FileOwner[]> {
    return of(this.owners);
  }

  addFile(file: Omit<FileItem, 'id'>): Observable<FileItem> {
    const newFile: FileItem = {
      ...file,
      id: Date.now().toString(),
    };
    this.files.push(newFile);
    return of(newFile);
  }

  deleteFile(id: string): Observable<void> {
    this.files = this.files.filter(file => file.id !== id);
    return of(undefined);
  }
}
