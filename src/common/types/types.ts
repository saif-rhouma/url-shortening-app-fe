export interface IConfirmDialog {
  isOpen: boolean;
  onClose: () => void;
  shortCode: string;
}

export interface IShortenedUrl {
  originalUrl: string;
  shortCode: string;
  expiresAt?: Date;
  visits: number;
  isActive: boolean;
  qrCode?: string;
}
