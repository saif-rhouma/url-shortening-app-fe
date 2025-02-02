import { ShortenedUrlPayload, ShortenedUrlResponse } from '../common/types/url';
import axiosInstance, { endpoints } from '../common/utils/axios';

const getAllUrls = async (): Promise<ShortenedUrlResponse[]> => {
  const { data } = await axiosInstance.get<ShortenedUrlResponse[]>(endpoints.shortenedUrl.list);
  return data;
};

const createShortenedUrl = async (payload: ShortenedUrlPayload): Promise<ShortenedUrlResponse> => {
  const { data } = await axiosInstance.post<ShortenedUrlResponse>(endpoints.shortenedUrl.create, payload);
  return data;
};

const visitShortenedUrl = async (shortCode: string): Promise<ShortenedUrlResponse> => {
  const { data } = await axiosInstance.get<ShortenedUrlResponse>(endpoints.shortenedUrl.visit + shortCode);
  return data;
};

const getUrlDetails = async (shortCode: string): Promise<ShortenedUrlResponse> => {
  const { data } = await axiosInstance.get<ShortenedUrlResponse>(endpoints.shortenedUrl.list + shortCode);
  return data;
};

const getUrlQrImage = async (shortCode: string) => {
  const { data } = await axiosInstance.get(endpoints.shortenedUrl.qrCodeImage + shortCode, {
    responseType: 'blob',
  });
  const imageObjectURL = URL.createObjectURL(data);
  return imageObjectURL;
};

export const shortenedUrlService = {
  getAllUrls,
  createShortenedUrl,
  visitShortenedUrl,
  getUrlDetails,
  getUrlQrImage,
};
