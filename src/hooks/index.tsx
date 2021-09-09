import {useContext} from 'react';
import {
  NotificationContext,
  PaymentContext,
  PreloaderContext,
  ErrorContext,
  ModalContext,
} from '../store';

export const usePreloader = () => useContext(PreloaderContext);
export const useErrorBoundary = () => useContext(ErrorContext);
export const usePayment = () => useContext(PaymentContext);
export const useNotification = () => useContext(NotificationContext);
export const useModal = () => useContext(ModalContext);
