import { toast, TypeOptions } from 'react-toastify';

const getToast = (type: TypeOptions, message: string): void => {
  toast(message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    type,
    style: { fontFamily: 'arial', fontSize: 22 },
  });
};

export default getToast;
