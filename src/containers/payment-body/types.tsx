import {CurrencyType} from '../../components/payment/types';

export interface Props {
  children: JSX.Element;
  companyLogo?: string;
  companyDescription?: string;
  companyTitle?: string;
  currency: CurrencyType;
  paymentAmount: number;
  paymentTitle: string;
  PaymentDescription: string;
  supportPhoneNumber?: string;
  supportEmail?: string;
}
