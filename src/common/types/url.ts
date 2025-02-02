export interface ShortenedUrlPayload {
  url: string;
}

export interface ShortenedUrlResponse {
  originalUrl: string;
  shortCode: string;
  visits: number;
  isActive: boolean;
  qrCode: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
