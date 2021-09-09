import React, {FC, useEffect} from 'react';
import {Images} from '../../assets';
import {PaymentStatus} from '../../store/payment/types';
import {convertNumberToStringWithCommas} from '../../utils/currency';
import {Button} from '../../components';
import {CurrencyType} from './types';
import {useModal, useNotification, usePayment} from '../../hooks';
import {Image, Text, View} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {CoinForBarterStatus} from '../../types';

const Index: FC<{
  status: PaymentStatus;
  currency: CurrencyType;
  id: string;
  txRef: string;
}> = ({status, currency, id, txRef}) => {
  const {closeModal} = useModal();
  const {
    state: {payment},
    tryAgain,
    config,
  } = usePayment();
  const {setExpiryTime} = useNotification();

  useEffect(() => {
    tryAgain(false);
    try {
      setExpiryTime(0);
      config?.callback({
        message:
          payment.status === PaymentStatus.Success
            ? 'successful'
            : 'unsuccessful',
        amount: payment.amount,
        currency: payment.currency,
        status:
          payment.status === PaymentStatus.Success
            ? CoinForBarterStatus.Success
            : CoinForBarterStatus.Error,
        customer: payment.customerDetails,
        transactionId: payment.id,
        baseCurrency: payment.baseCurrency,
        baseAmount: payment.baseAmount,
        txRef: payment.paymentRef,
      });
      setTimeout(() => {
        closeModal();
      }, 1000);
    } catch (error) {}
  }, [
    payment.sourceDetails.redirectUrl,
    tryAgain,
    id,
    status,
    txRef,
    setExpiryTime,
    payment,
    config,
    closeModal,
  ]);

  return (
    <View style={tw`flex items-center flex-col my-8`}>
      {status === PaymentStatus.Success && <Image source={Images.Success} />}

      {status !== PaymentStatus.Success && <Image source={Images.Error} />}

      <Text style={tw`text-lg font-bold text-center my-4`}>
        Payment {status !== PaymentStatus.Success && 'Unsuccessful'}
        {status === PaymentStatus.Success && 'Successful'}
      </Text>

      {status === PaymentStatus.Success && (
        <Text style={tw`text-sm  text-center my-4`}>
          You have successfully sent{' '}
          {convertNumberToStringWithCommas(payment.amountReceived || 0)}{' '}
          {currency.abbreviation} to{' '}
          {payment.branding?.businessName || payment.branding?.name}
        </Text>
      )}

      {status !== PaymentStatus.Success && (
        <Text style={tw`text-sm  text-center my-4`}>
          There was an error in your payment.
        </Text>
      )}

      {status !== PaymentStatus.Success && (
        <Button
          isRed={true}
          onClick={() => {
            tryAgain();
          }}>
          <Text> Try Again</Text>
        </Button>
      )}
    </View>
  );
};

export default Index;
