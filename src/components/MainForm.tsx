import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { HandThumbUpIcon, LinkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { shortenedUrlService } from '../services/shortened.service';
import { ShortenedUrlPayload, ShortenedUrlResponse } from '../common/types/url';
import { Form } from './ui/Form';
import LoadingButton from './ui/LoadingButton';
import ToastDanger from './ui/ToastDanger';
import ConfirmDialog from './ui/ConfirmDialog';
import { useBoolean } from '../hooks/use-boolean';

const CreateShortUrlSchema = zod.object({
  url: zod.string().url(),
});

const MainForm: React.FC = () => {
  const openDialog = useBoolean();
  const [shortenedUrl, setShortenedUrl] = useState<ShortenedUrlResponse>();

  const defaultValues: ShortenedUrlPayload = useMemo(
    () => ({
      url: '',
    }),
    [],
  );

  const notifyDanger = (message: string) => toast.custom((t) => <ToastDanger t={t} content={message} />);

  const methods = useForm({
    resolver: zodResolver(CreateShortUrlSchema),
    defaultValues,
  });

  const { mutate: createShortenedUrl, isPending } = useMutation({
    mutationFn: (payload: ShortenedUrlPayload) => {
      return shortenedUrlService.createShortenedUrl(payload);
    },
    onSuccess: async (res) => {
      setShortenedUrl(res);
      openDialog.onTrue();
    },
    onError: (err) => {
      notifyDanger(err.message);
    },
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(
    (payload) => {
      try {
        createShortenedUrl(payload);
        reset();
      } catch (error) {
        console.error(error);
      }
    },
    (errors) => {
      if (errors.url) {
        notifyDanger('The URL you provided is invalid.');
      }
    },
  );

  return (
    <div className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-white">Paste the URL to be shortened</h2>
            <p className="mt-4 text-lg text-gray-300">
              This is a test challenge project to create shortened URLs and generate short links. The URL shortening
              service allows users to create short links, making them easier to share.
            </p>
            {shortenedUrl?.shortCode && (
              <ConfirmDialog
                isOpen={openDialog.value}
                onClose={openDialog.onFalse}
                shortCode={shortenedUrl?.shortCode}
              />
            )}
            <Form methods={methods} onSubmit={onSubmit}>
              <div className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="url-address" className="sr-only">
                  Url Link
                </label>
                <input
                  id="url-address"
                  {...methods.register('url')}
                  type="text"
                  required
                  placeholder="Enter the link here"
                  className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
                <LoadingButton text="Generate" isLoading={isPending} />
              </div>
            </Form>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandThumbUpIcon aria-hidden="true" className="size-6 text-white" />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">Easy</dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                URL shortening Service is easy and fast, enter the long link to get your shortened link.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <LinkIcon aria-hidden="true" className="size-6 text-white" />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">Shortened</dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                Use any link, no matter what size, ShortURL always shortens.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  );
};
export default MainForm;
