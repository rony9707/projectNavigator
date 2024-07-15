// project-title.model.ts
export interface ProjectTitle {
  title: string;
}

// application-link.model.ts
export interface ApplicationLink {
  environmentName: string;
  environmentLink: string;
}


/// src/app/models/link.interface.ts
export interface Link {
  linkName: string;
  linkUrl: string;
}

// src/app/models/copy.interface.ts
export interface Copy {
  linkName: string;
  copyText: string;
  copyFlag: boolean;
}

export type OtherLink = Link | Copy;

// application-link.model.ts
export interface DownloadLink {
  downloadFile: string;
  downloadFileURL: string;
}