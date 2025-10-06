export enum FileType {
  FILE = "file",
  FOLDER = "folder",
}

export interface PrecheckFile {
  name: string;
  file_type: FileType;
}
