import toast, { Toast } from 'react-hot-toast';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ToastDanger = ({ t, content }: { t: Toast; content: string }) => {
  return (
    <div
      id="toast-default"
      data-testid="toast-danger"
      className={`flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800  ${t.visible ? 'animate-enter' : 'animate-leave'}`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
        <ExclamationTriangleIcon />
      </div>
      <div className="ms-3 text-sm font-normal">{content}</div>
      <button
        type="button"
        className="ml-auto  -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={() => {
          toast.dismiss(t.id);
        }}
      >
        <XMarkIcon />
      </button>
    </div>
  );
};
export default ToastDanger;
