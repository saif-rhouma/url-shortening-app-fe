import { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ClipboardDocumentIcon, FireIcon, LinkIcon } from '@heroicons/react/24/outline';
import ToastSuccess from './ToastSuccess';
import toast from 'react-hot-toast';
import { IConfirmDialog } from '../../common/types/types';
import { shortenedUrlService } from '../../services/shortened.service';

const ConfirmDialog = ({ isOpen, onClose, shortCode }: IConfirmDialog) => {
  const [shortLink, setShortLink] = useState<string>();
  const [qrImage, setQrImage] = useState<string | null>(null);

  const notify = (message: string) => toast.custom((t) => <ToastSuccess t={t} content={message} />);

  useEffect(() => {
    const serverBase = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/`;
    const fetchQrImage = async () => {
      try {
        const imageObjectURL = await shortenedUrlService.getUrlQrImage(shortCode);
        setQrImage(imageObjectURL);
      } catch (error) {
        console.error('Error fetching QR Code:', error);
      }
    };

    fetchQrImage();
    setShortLink(`${serverBase + shortCode}`);
    return () => {};
  }, [shortCode]);

  const handleCopyShortenedLink = useCallback((link: string | undefined) => {
    if (navigator.clipboard && link) {
      navigator.clipboard.writeText(link);
    }
    notify('The Link In on your Clipboard. [IN CASE HTTPS]');
  }, []);

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex flex-col items-center">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <FireIcon aria-hidden="true" className="size-6 text-red-600" />
                </div>
                <div className="mt-3 text-center mt-4">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    URL has been Shortened successfully
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your shortened URLs can be used in publications, documents, advertisements, blogs, forums, instant
                      messages, and other locations. Track statistics for your business and projects by monitoring the
                      number of hits from your URL with our click counter.
                    </p>
                  </div>
                  <div className="flex flex-col items-center mt-4 mb-4 ">
                    {qrImage && <img className="border border-gray-300 rounded-lg" alt="icon" src={qrImage} />}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex  max-w-sm mx-auto">
              <label htmlFor="simple-search" className="sr-only">
                ShortLink
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <LinkIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-8 "
                  defaultValue={shortLink}
                />
                <button
                  type="button"
                  onClick={() => {
                    handleCopyShortenedLink(shortLink);
                  }}
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white rounded-e-lg bg-green-500 border border-gray-300 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-white dark:focus:ring-blue-500  dark:focus:border-blue-500"
                >
                  <ClipboardDocumentIcon className="w-4 h-4" />
                  <span className="sr-only">Copy</span>
                </button>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => {
                  onClose();
                }}
                className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500  max-h-full w-full"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
export default ConfirmDialog;
