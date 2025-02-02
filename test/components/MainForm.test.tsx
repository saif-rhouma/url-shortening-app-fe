/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import MainForm from '../../src/components/MainForm';

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    useMutation: vi.fn(() => ({
      mutate: vi.fn(),
      isPending: false,
      reset: vi.fn(),
    })),
  };
});

vi.mock('react-hook-form', async (importActual) => {
  const actual = await importActual<any>();
  return {
    ...actual,
    useForm: vi.fn(() => ({
      register: vi.fn(),
      handleSubmit: (fn) => fn,
      reset: vi.fn(),
      formState: { errors: {} },
    })),
  };
});

const renderWithQueryClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('MainForm', () => {
  it('Renders MainForm component', () => {
    renderWithQueryClient(<MainForm />);
    expect(screen.getByText(/Paste the URL to be shortened/i)).toBeInTheDocument();
  });

  it('Accepts user input and submits the form', async () => {
    const mutateMock = vi.fn();

    (useMutation as vi.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
    });
    renderWithQueryClient(<MainForm />);

    const input = screen.getByPlaceholderText(/Enter the link here/i);
    const button = screen.getByTestId('url-btn');

    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalled();
    });
  });
});
