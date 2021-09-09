import React, {FC, useEffect, useCallback, useState} from 'react';
import {PaymentBody} from '../../containers';
import {PaymentStatus} from '../../store/payment/types';
import ProcessingStatus from './payment-status';
import PaymentCurrency from './payment-currency';
import {CurrencyType} from './types';
import ProcessingPayment from './payment-processing';
import {PaymentErrors} from '../../containers/payment-body/payment-error';
import {useNotification, usePayment, usePreloader} from '../../hooks';
import {coinForBarterRequest} from '../../server';
import {CoinForBarterStatus, MethodTypes} from '../../types';
import {Button} from '../button';
import {Text, View} from 'react-native';
import tw from 'tailwind-react-native-classnames';

const defaultCurrency = {
  currency: '',
  symbol: '',
  abbreviation: '',
  isAvailable: false,
  code: 0,
  networks: [],
  type: '',
};
export const Payment: FC = () => {
  const {
    state: {payment},
    cancelPayment,
    config,
  } = usePayment();
  const {setIsLoading} = usePreloader();
  const [currencies, setCurrencies] = useState<CurrencyType[]>([]);
  const [currency, setCurrency] = useState<CurrencyType>(defaultCurrency);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const notification = useNotification();

  const getCurrencies = useCallback(async () => {
    setIsLoading(true);
    const {status, data} = await coinForBarterRequest.call(
      '/currencies',
      MethodTypes.Get,
    );

    if (status === CoinForBarterStatus.Success) {
      setCurrencies(data);
    }
    setIsLoading(false);
  }, [setCurrencies, setIsLoading]);

  useEffect(() => {
    if (payment.baseCurrency) {
      getCurrencies();
    }
  }, [payment, getCurrencies]);

  useEffect(() => {
    setCurrency(
      currencies.find(
        item =>
          item.abbreviation === (payment.currency || payment.baseCurrency),
      ) || defaultCurrency,
    );
  }, [currencies, payment]);

  const handleError = (
    data: Record<string, any>,
    statusCode: number,
    message: string,
  ) => {
    notification.error(message);
    if (statusCode === 400) {
      setErrors(data.errors);
    }
  };

  const cancel = () => {
    cancelPayment(payment.id, handleError, config?.publicKey || '');
  };

  return (
    <PaymentBody
      companyTitle={payment.branding?.businessName || payment.branding?.name}
      companyDescription={payment.branding?.description}
      companyLogo={payment.branding?.logo?.replace('/\\/g', '/')}
      paymentAmount={
        !(
          payment.status === PaymentStatus.Success ||
          payment.status === PaymentStatus.Error ||
          payment.status === PaymentStatus.Cancelled
        )
          ? payment.amount || payment.baseAmount
          : 0
      }
      paymentTitle={''}
      PaymentDescription={''}
      currency={currency}
      supportEmail={payment.branding?.supportEmail}
      supportPhoneNumber={payment.branding?.supportPhoneNumber}>
      <>
        {Object.values(errors).length > 0 && <PaymentErrors errors={errors} />}
        {!(
          payment.status === PaymentStatus.Success ||
          payment.status === PaymentStatus.Error ||
          payment.status === PaymentStatus.Cancelled
        ) && (
          <>
            {!payment.isCurrencyLocked && (
              <PaymentCurrency
                setErrors={setErrors}
                handleError={handleError}
                currencies={currencies}
              />
            )}
            {payment.isCurrencyLocked && (
              <ProcessingPayment currency={currency} />
            )}

            <View style={tw`flex justify-center pt-8`}>
              <Button
                isRed={true}
                onClick={() => {
                  cancel();
                }}>
                <Text> Cancel Payment </Text>
              </Button>
            </View>
          </>
        )}

        {(payment.status === PaymentStatus.Success ||
          payment.status === PaymentStatus.Error ||
          payment.status === PaymentStatus.Cancelled) && (
          <ProcessingStatus
            status={payment.status}
            currency={currency}
            id={payment._id}
            txRef={payment.sourceDetails.txRef}
          />
        )}
      </>
    </PaymentBody>
  );
};

export default Payment;
