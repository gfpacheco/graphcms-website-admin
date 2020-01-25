import { useContext } from 'react';
import ToastContext from '../components/Toasts/ToastContext';

function useToast() {
  return useContext(ToastContext);
}

export default useToast;
