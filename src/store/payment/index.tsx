/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useReducer,
  FC,
  useCallback,
  useState,
} from 'react';
import {useErrorBoundary, useNotification, usePreloader} from '../../hooks';
import {coinForBarterRequest} from '../../server';
import {CoinForBarterStatus, MethodTypes} from '../../types';
import {paymentReducer, initialState} from './reducer';
import {
  DefaultPaymentContextValue,
  PaymentStatus,
  PaymentTypeOptions,
  Props,
} from './types';

const defaultPaymentContextValue: DefaultPaymentContextValue = {
  state: initialState(),
  submitCurrency: (
    id: string,
    network: string,
    currency: string,
    handleError: (
      data: Record<string, any>,
      statusCode: number,
      message: string,
    ) => void,
  ) => {},
  lockCurrency: (
    id: string,
    handleError: (
      data: Record<string, any>,
      statusCode: number,
      message: string,
    ) => void,
    publicKey: string,
  ) => {},
  cancelPayment: (
    id: string,
    handleError: (
      data: Record<string, any>,
      statusCode: number,
      message: string,
    ) => void,
    publicKey: string,
  ) => {},
  findPayment: () => {},
  downloadReceipt: () => {},
  tryAgain: (shouldClearState?: boolean) => {},
};

export const PaymentContext = createContext<DefaultPaymentContextValue>(
  defaultPaymentContextValue,
);

export const PaymentProvider: FC<Props> = ({children, config}) => {
  const [state, dispatch] = useReducer(paymentReducer, initialState());
  const {setIsLoading} = usePreloader();
  const {setError} = useErrorBoundary();
  const path = '/payments/checkout';
  const {success, setExpiryTime} = useNotification();
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(
    undefined,
  );

  const submitCurrency = useCallback(
    async (
      id: string,
      network: string,
      currency: string,
      handleError: (
        data: Record<string, any>,
        statusCode: number,
        message: string,
      ) => void,
      publicKey,
    ) => {
      setIsLoading(true);
      const {status, data, statusCode, message} =
        await coinForBarterRequest.call(
          `${path}/${id}/currency/set/${currency}/${network}`,
          MethodTypes.Patch,
          {},
          publicKey,
        );
      if (status === CoinForBarterStatus.Success) {
        success(`Currency changed to ${currency}, ${network}`);
        dispatch({type: PaymentTypeOptions.UPDATE, payload: data});
      } else {
        handleError(data, statusCode, message);
      }
      setIsLoading(false);
    },
    [setIsLoading, success],
  );

  const startWebSocket = useCallback(async (id: string, publicKey: string) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
    setIntervalId(
      setTimeout(() => {
        findPayment(id, publicKey);
      }, 60000),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lockCurrency = useCallback(
    async (
      id: string,
      handleError: (
        data: Record<string, any>,
        statusCode: number,
        message: string,
      ) => void,
      publicKey: string,
    ) => {
      setIsLoading(true);
      const {status, data, statusCode, message} =
        await coinForBarterRequest.call(
          `${path}/${id}/currency/lock`,
          MethodTypes.Patch,
          {},
          publicKey,
        );
      if (status === CoinForBarterStatus.Success) {
        setExpiryTime(data.expiresBy);
        startWebSocket(id, publicKey);
        dispatch({type: PaymentTypeOptions.UPDATE, payload: data});
      } else {
        handleError(data, statusCode, message);
      }
      setIsLoading(false);
    },
    [setIsLoading, setExpiryTime, startWebSocket],
  );

  const findPayment = useCallback(
    async (id: string, publicKey: string) => {
      setIsLoading(true);
      const {status, data, statusCode, message} =
        await coinForBarterRequest.call(
          `${path}/${id}`,
          MethodTypes.Get,
          {},
          publicKey,
        );

      if (status === CoinForBarterStatus.Success) {
        if (
          data.isCurrencyLocked &&
          ![
            PaymentStatus.Cancelled,
            PaymentStatus.Error,
            PaymentStatus.Success,
          ].includes(data.status)
        ) {
          setExpiryTime(data.expiresBy);
          startWebSocket(id, publicKey);
        }
        dispatch({type: PaymentTypeOptions.UPDATE, payload: data});
      } else {
        setError({message, statusCode, data});
      }
      setIsLoading(false);
    },
    [setIsLoading, setError, setExpiryTime, startWebSocket],
  );

  const tryAgain = useCallback(
    async (shouldClearState = true) => {
      setIsLoading(true);
      if (shouldClearState) {
        dispatch({type: PaymentTypeOptions.CLEAR, payload: {}});
      }
      setIsLoading(false);
    },
    [setIsLoading],
  );

  const downloadReceipt = useCallback(async () => {
    setIsLoading(true);
    await coinForBarterRequest.call(
      `${path}/${state.payment._id}/download`,
      MethodTypes.Get,
      {},
    );
    setIsLoading(false);
  }, [setIsLoading, state.payment._id]);

  const cancelPayment = useCallback(
    async (
      id: string,
      handleError: (
        data: Record<string, any>,
        statusCode: number,
        message: string,
      ) => void,
      publicKey: string,
    ) => {
      setIsLoading(true);
      const {status, data, statusCode, message} =
        await coinForBarterRequest.call(
          `${path}/${id}/cancel`,
          MethodTypes.Patch,
          {},
          publicKey,
        );
      if (status === CoinForBarterStatus.Success) {
        success(message);
        dispatch({
          type: PaymentTypeOptions.UPDATE,
          payload: {...state, status: PaymentStatus.Cancelled},
        });
      } else {
        handleError(data, statusCode, message);
      }
      setIsLoading(false);
    },
    [setIsLoading, state, success],
  );

  return (
    <PaymentContext.Provider
      value={{
        state,
        dispatch,
        submitCurrency,
        lockCurrency,
        cancelPayment,
        findPayment,
        downloadReceipt,
        tryAgain,
        config,
      }}>
      {children}
    </PaymentContext.Provider>
  );
};
