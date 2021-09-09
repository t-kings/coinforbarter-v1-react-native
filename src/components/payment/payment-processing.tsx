import React, {FC} from 'react';
import {Image, Text, TouchableOpacity, View, Linking} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {useNotification, usePayment} from '../../hooks';
import {convertNumberToStringWithCommas} from '../../utils/currency';
import {PaymentStyle} from './style';
import {CurrencyType} from './types';
import Clipboard from '@react-native-clipboard/clipboard';

const Index: FC<{currency: CurrencyType}> = ({currency}) => {
  const {
    state: {payment},
    config,
  } = usePayment();
  const {success} = useNotification();

  const copyAddress = () => {
    Clipboard.setString(payment.addressInformation?.address || '');
    success('Address copied to clip board');
  };

  const copyId = () => {
    Clipboard.setString(payment.id);
    success('Id copied to clip board');
  };

  const copyAmount = () => {
    Clipboard.setString((payment.amount || 0).toString());
    success('Amount copied to clip board');
  };

  const openLink = () => {
    Linking.openURL(
      `https://developers.coinforbarter.com/docs/overview-test-wallets?paymentId=${payment.id}&amount=${payment.amount}`,
    );
  };
  const isTestMode = config?.publicKey.substr(0, 9) === 'C4B_TEST-';

  return (
    <View style={tw`my-8`}>
      {!isTestMode && (
        <>
          <Text style={tw`font-bold text-base`}>
            Payment is being processed to the address below
          </Text>
          <View style={tw`my-4 `}>
            <View
              style={{
                ...tw`flex justify-between flex-row items-center my-4`,
                ...PaymentStyle.addressCopy,
              }}>
              <Text style={tw`flex-1 px-4 `}>
                {payment.addressInformation?.address || ''}
              </Text>
              <TouchableOpacity onPress={copyAddress}>
                <Text
                  style={{
                    ...tw`px-4 py-2 text-white`,
                    ...PaymentStyle.addressCopyButton,
                  }}>
                  Copy
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                ...tw`bg-red-50 py-2 px-4 text-xs text-red-900`,
              }}>
              Only send a {payment.currency}({payment.currencyNetwork}) to this
              address, sending a different currency might lead to a permanent
              loss of funds
            </Text>
          </View>

          <View style={tw`flex flex-row justify-center`}>
            <Image
              source={{
                uri: `https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${currency.currency}:${payment.addressInformation?.address}&amount=${payment.amount}&network=${payment.currencyNetwork}&message=coinforbarter-payment`,
              }}
              style={PaymentStyle.barCode}
            />
          </View>
        </>
      )}

      {isTestMode && (
        <>
          <View style={tw`my-4 `}>
            <Text style={tw`bg-red-50 py-2 px-4 text-xs text-red-900 my-4`}>
              Visit the url below to complete this test payment with the details
              below.
            </Text>
            <View style={tw`my-4`}>
              <Text style={tw`font-bold mb-2 `}>Url</Text>
              <View
                style={{
                  ...tw`flex justify-between flex-row items-center my-4 items-center`,
                  ...PaymentStyle.addressCopy,
                }}>
                <Text style={tw` flex-1 px-4 py-2 text-xs`}>
                  {`https://developers.coinforbarter.com/docs/overview-test-wallets?paymentId=${payment.id}&amount=${payment.amount}`}
                </Text>
                <TouchableOpacity onPress={openLink}>
                  <Text
                    style={{
                      ...tw` px-4 py-4 text-white`,
                      ...PaymentStyle.addressCopyButton,
                    }}>
                    Open
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={tw`my-4`}>
              <Text style={tw`font-bold mb-2 `}>Payment Id</Text>
              <View
                style={{
                  ...tw`flex justify-between flex-row items-center`,
                  ...PaymentStyle.addressCopy,
                }}>
                <Text style={tw` flex-1 px-2`}>{payment.id}</Text>
                <TouchableOpacity onPress={copyId}>
                  <Text
                    style={{
                      ...tw` px-4 py-4 text-white`,
                      ...PaymentStyle.addressCopyButton,
                    }}>
                    Copy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={tw`my-4`}>
              <Text style={tw`font-bold mb-2 `}>Payment Amount</Text>
              <View
                style={{
                  ...tw`flex justify-between flex-row items-center`,
                  ...PaymentStyle.addressCopy,
                }}>
                <Text style={tw` flex-1 px-4`}>{payment.amount || 0}</Text>
                <TouchableOpacity onPress={copyAmount}>
                  <Text
                    style={{
                      ...tw` px-4 py-4 text-white`,
                      ...PaymentStyle.addressCopyButton,
                    }}>
                    Copy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
      <View
        style={{
          ...tw`py-2 px-4  `,
          ...PaymentStyle.addressReceivedInfo,
        }}>
        {!isTestMode && (
          <Text>
            We are now listening to the bitcoin network to approve your
            transaction.
          </Text>
        )}
        {isTestMode && (
          <Text>
            We are now listening to the test network to approve your
            transaction.
          </Text>
        )}
        {payment.amountReceived ? (
          <View>
            <Text>
              {convertNumberToStringWithCommas(payment.amountReceived || 0)}{' '}
              {currency.abbreviation}
            </Text>{' '}
            has been received, send extra{' '}
            <Text>
              {' '}
              {convertNumberToStringWithCommas(
                (payment.amount || 0) - (payment.amountReceived || 0) || 0,
              )}{' '}
              {currency.abbreviation}
            </Text>{' '}
            to complete
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default Index;
