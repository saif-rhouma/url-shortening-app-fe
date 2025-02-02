import React from 'react';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Redirect from '../../src/components/Redirect';
import { shortenedUrlService } from '../../src/services/shortened.service';
import { useQuery } from '@tanstack/react-query';

// Mock the shortenedUrlService to simulate a successful and error response
vi.mock('../../src/services/shortened.service', () => ({
  shortenedUrlService: {
    getUrlDetails: vi.fn(),
  },
}));

// Mock the useQuery hook to control loading and error states
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}));

// Test the component
describe('Redirect Component', () => {
  it('should display loading message when fetching data', () => {
    useQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={['/redirect/some-short-code']}>
        <Routes>
          <Route path="/redirect/:shortCode" element={<Redirect />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/Getting Information from Server/i)).toBeInTheDocument();
  });

  it('should display error message when there is an error fetching the URL', async () => {
    useQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <MemoryRouter initialEntries={['/redirect/some-short-code']}>
        <Routes>
          <Route path="/redirect/:shortCode" element={<Redirect />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/Oops, Error fetching URL. Redirecting to home.../i)).toBeInTheDocument();
  });

  it('should start countdown and redirect after 5 seconds', async () => {
    const mockResponse = {
      _id: '679e3774254123e63a8a5bc6',
      originalUrl: 'https://www.npmjs.com/package/qrcode',
      shortCode: 'eDtIoImLtq',
      visit: 0,
      isActive: true,
      qrCode: '/qr/eDtIoImLtq',
      createdAt: '2025-02-01T15:02:12.809Z',
      updatedAt: '2025-02-01T16:39:45.604Z',
      __v: 0,
      visits: 28,
    };
    shortenedUrlService.getUrlDetails.mockResolvedValueOnce(mockResponse);

    useQuery.mockReturnValue({
      data: mockResponse,
      isLoading: false,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={['/redirect/some-short-code']}>
        <Routes>
          <Route path="/redirect/:shortCode" element={<Redirect />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
