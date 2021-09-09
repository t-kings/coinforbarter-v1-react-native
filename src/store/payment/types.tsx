import {Dispatch} from 'react';
import {CoinForBarterConfig, CustomerType} from '../../types';
import {ReducerActionType} from '../types';

export interface DefaultPaymentContextValue {
  state: PaymentResponseType;
  dispatch?: Dispatch<ReducerActionType<PaymentTypeOptions, PaymentType>>;
  submitCurrency: (
    id: string,
    network: string,
    currency: string,
    handleError: (
      data: Record<string, any>,
      statusCode: number,
      message: string,
    ) => void,
    publicKey: string,
  ) => void;
  lockCurrency: (
    id: string,
    handleError: (
      data: Record<string, any>,
      statusCode: number,
      message: string,
    ) => void,
    publicKey: string,
  ) => void;
  cancelPayment: (
    id: string,
    handleError: (
      data: Record<string, any>,
      statusCode: number,
      message: string,
    ) => void,
    publicKey: string,
  ) => void;
  findPayment: (id: string, publicKey: string) => void;
  downloadReceipt: () => void;
  tryAgain: (shouldClearState?: boolean) => void;
  config?: CoinForBarterConfig;
}

export enum PaymentTypeOptions {
  UPDATE = 'UPDATE',
  CREATE = 'CREATE',
  CLEAR = 'CLEAR',
}

export interface Props {
  children: JSX.Element;
  config: CoinForBarterConfig;
}

export interface PaymentResponseType {
  payment: PaymentType;
}

export interface PaymentType {
  status: PaymentStatus;
  description: string;
  sourceDetails: Record<string, any>;
  currency?: string;
  currencyNetwork?: string;
  amount?: number;
  nairaValue?: number;
  dollarValue?: number;
  baseAmount: number;
  baseCurrency: string;
  currencies: string[];
  transactionFees: number;
  totalDue: number;
  customer?: string;
  customerDetails?: CustomerType;
  destinationAddress?: string;
  id: string;
  destinationAddressInformation?: AddressInformation;
  sourceAddressInformation?: Record<string, any>[];
  isCurrencyLocked?: boolean;
  branding?: BrandingType;
  _id: string;
  amountReceived?: number;
  expiresBy?: number;
  addressInformation?: Record<string, any>;
  paymentRef?: string;
}

export enum PaymentStatus {
  Success = 'success',
  Error = 'error',
  Pending = 'pending',
  Cancelled = 'cancelled',
  Inprogress = 'in progress',
  Null = '',
}

export type AddressInformation = {
  address: string;
  network: string;
  id: string;
};

export interface BrandingType {
  accountId: string;
  businessName: string;
  description: string;
  logo: string;
  color: string;
  name: string;
  supportEmail: string;
  supportPhoneNumber: string;
}
