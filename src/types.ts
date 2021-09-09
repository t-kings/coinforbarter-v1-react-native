export interface CoinForBarterConfig {
  publicKey: string;
  txRef: string;
  amount: number;
  currency: string;
  redirectUrl?: string;
  /**
   * customer is customer's email
   */
  customer: string;
  customerPhoneNumber?: string;
  customerFullName?: string;
  callback: (data: CallbackType) => void;
  customizations?: Customization;
  /**
   * leave empty if you want to accept all currencies
   */
  currencies: string[];
}

export interface Customization {
  title?: string;
  description?: string;
  logo?: string;
}

export type CustomerType = {
  fullName: string;
  email: string;
  phoneNumber: string;
};

export enum CloseType {
  Error = 'error',
  Success = 'success',
}

export class CustomException {
  name = 'CustomException';
  response = {};
  constructor(data: Record<string, any>) {
    this.response = {...data};
  }
}

export interface BodyType {
  publicKey: string;
  txRef: string;
  amount: number;
  currency: string;
  redirectUrl?: string;
  meta?: Record<string, any>;
  customer: string;
  customerPhoneNumber?: string;
  customerFullName?: string;
  customizations?: Customization;
  baseCurrency?: string;
}

export enum CoinForBarterStatus {
  Success = 'success',
  Error = 'error',
}

export type CallbackType = {
  amount?: number;
  amountReceived?: number;
  currency?: string;
  customer?: CustomerType;
  status: CoinForBarterStatus;
  txRef?: string;
  transactionId?: string;
  baseCurrency?: string;
  baseAmount?: number;
  message: string;
};

export interface ConfigType extends BodyType {
  onSuccess: (data: CallbackType) => void;
  onError: (data: CallbackType) => void;
}

export interface CoinForBarterButtonProps {
  config: CoinForBarterConfig;
  text?: string;
  component?: () => JSX.Element;
}

export interface RequestResponseSchema {
  status: CoinForBarterStatus;
  data: any;
  message: string;
  statusCode: number;
}

export enum MethodTypes {
  Post = 'post',
  Get = 'get',
  Delete = 'delete',
  Patch = 'patch',
}

export enum CurrencyTypeOptions {
  Fiat = 'fiat',
  Crypto = 'crypto',
}
