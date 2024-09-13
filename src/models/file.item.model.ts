export interface FileItem {
  id: string;
  name: string;
  creation: Date;
  owners: FileOwner[];
  type: FileType;
  parentId?: string;
  selected?: boolean;
}

export interface FileOwner {
  name: string;
  avatarUrl: string;
}

export enum FileType {
  FOLDER,
  FILE
}
