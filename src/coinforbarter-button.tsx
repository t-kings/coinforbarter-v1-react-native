import React, {FC, useState, useEffect, useCallback} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {
  BodyType,
  CoinForBarterButtonProps,
  CoinForBarterConfig,
  CoinForBarterStatus,
  MethodTypes,
} from './types';
import {coinForBarterStyle} from './style';
import {coinForBarterRequest} from './server';
import {
  ErrorProvider,
  ModalProvider,
  NotificationProvider,
  PaymentProvider,
  PreloaderProvider,
} from './store';
import {useErrorBoundary, usePayment, usePreloader} from './hooks';
import {Payment} from './components';

export const CoinForBarterButton: FC<CoinForBarterButtonProps> = ({
  config,
  text,
  component,
}) => {
  const [isPaying, setIsPaying] = useState(false);
  const pay = () => {
    setIsPaying(true);
  };
  return (
    <>
      {isPaying && (
        <Modal
          animationType="slide"
          visible={true}
          onRequestClose={() => {
            setIsPaying(false);
          }}>
          <ModalProvider
            closeModal={() => {
              setIsPaying(false);
            }}>
            <PreloaderProvider>
              <NotificationProvider>
                <ErrorProvider>
                  <PaymentProvider config={{...config}}>
                    <CoinForBarterCheckout config={{...config}} />
                  </PaymentProvider>
                </ErrorProvider>
              </NotificationProvider>
            </PreloaderProvider>
          </ModalProvider>
        </Modal>
      )}
      <TouchableOpacity onPress={pay}>
        {component && component()}
        {!component && (
          <View style={coinForBarterStyle.Button}>
            {!text && (
              <Image
                source={require('./logo.png')}
                style={coinForBarterStyle.Image}
              />
            )}
            <Text style={coinForBarterStyle.ButtonText}>
              {text ? text : 'Pay with CoinForBarter'}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

const CoinForBarterCheckout: FC<{
  config: CoinForBarterConfig;
}> = ({config}) => {
  const {findPayment} = usePayment();
  const {setIsLoading} = usePreloader();
  const {setError} = useErrorBoundary();

  const startPayment = useCallback(
    async (body: BodyType) => {
      setIsLoading(true);
      const {data, status, message, statusCode} =
        await coinForBarterRequest.call(
          '/payments/checkout',
          MethodTypes.Post,
          body,
        );

      if (status !== CoinForBarterStatus.Success) {
        setError({
          message,
          data,
          statusCode,
        });
      } else {
        findPayment(data.payment.id, config.publicKey);
      }
      setIsLoading(false);
    },
    [setIsLoading, findPayment, config.publicKey, setError],
  );

  const initializePayment = useCallback(() => {
    const {
      publicKey,
      txRef,
      amount,
      currency,
      customer,
      customerPhoneNumber,
      customerFullName,
      customizations,
    } = config;
    const body: BodyType = {
      publicKey,
      txRef,
      amount,
      currency,
      customer,
      customerPhoneNumber,
      customerFullName,
      customizations,
    };
    startPayment(body);
  }, [config, startPayment]);

  useEffect(() => {
    initializePayment();
  }, [initializePayment]);
  return <Payment />;
};
