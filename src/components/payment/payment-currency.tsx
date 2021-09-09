import React, {useState, FC} from 'react';
import {Images} from '../../assets';
import {Button} from '../../components';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {CurrencyType} from './types';
import {usePayment} from '../../hooks';
import {PaymentStyle} from './style';

const defaultCurrency = {
  currency: '',
  symbol: '',
  abbreviation: '',
  isAvailable: false,
  code: 0,
  networks: [],
  type: '',
};

const Index: FC<{
  setErrors: (errors: Record<string, string[]>) => void;
  handleError: (
    data: Record<string, any>,
    statusCode: number,
    message: string,
  ) => void;
  currencies: CurrencyType[];
}> = ({setErrors, handleError, currencies}) => {
  const {
    state: {payment},
    submitCurrency,
    lockCurrency,
    config,
  } = usePayment();
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyType>(defaultCurrency);

  const selectCurrency = (ntw: string) => {
    setErrors({});
    submitCurrency(
      payment.id,
      ntw,
      selectedCurrency.abbreviation,
      handleError,
      config?.publicKey || '',
    );
  };

  const handleLockCurrency = () => {
    lockCurrency(payment.id, handleError, config?.publicKey || '');
  };
  return (
    <>
      <Text style={tw`font-bold text-lg`}>Select Currency</Text>
      {payment.currencies.map((item: string) => {
        const currencyItem =
          currencies.find(c => c.abbreviation === item) || defaultCurrency;
        return (
          <View
            style={{...tw` my-4 p-4`, ...PaymentStyle.currencyOption}}
            key={item}>
            <TouchableOpacity
              onPress={() => {
                setSelectedCurrency(
                  currencies.find(c => c.abbreviation === item) ||
                    defaultCurrency,
                );
              }}>
              <View style={tw`flex flex-row justify-between items-center`}>
                <View style={tw`flex flex-row items-center`}>
                  <View style={tw`mr-4`}>
                    {currencyItem.abbreviation === 'DOGE' && (
                      <Image source={Images.DOGE} />
                    )}
                    {currencyItem.abbreviation === 'BTC' && (
                      <Image source={Images.BTC} />
                    )}
                    {currencyItem.abbreviation === 'DAI' && (
                      <Image source={Images.Dai} />
                    )}
                    {currencyItem.abbreviation === 'BCH' && (
                      <Image source={Images.Bch} />
                    )}
                    {currencyItem.abbreviation === 'BUSD' && (
                      <Image source={Images.Busd} />
                    )}
                    {currencyItem.abbreviation === 'ETH' && (
                      <Image source={Images.Eth} />
                    )}
                    {currencyItem.abbreviation === 'PAX' && (
                      <Image source={Images.Pax} />
                    )}
                    {currencyItem.abbreviation === 'USDC' && (
                      <Image source={Images.Usdc} />
                    )}

                    {currencyItem.abbreviation === 'USDT' && (
                      <Image source={Images.Usdt} />
                    )}
                    {currencyItem.abbreviation === 'WBTC' && (
                      <Image source={Images.Wbtc} />
                    )}
                  </View>
                  <Text style={tw`text-sm capitalize`}>
                    {currencyItem.currency}
                  </Text>
                </View>

                <Image source={Images.CurrencyArrow} />
              </View>
            </TouchableOpacity>
            {selectedCurrency.abbreviation ===
              currencies.find(c => c.abbreviation === item)?.abbreviation && (
              <View
                style={tw`mx-4 mt-4 flex pt-4 border-t flex-row items-center`}>
                {selectedCurrency.networks.map((network: string) => (
                  <TouchableOpacity
                    key={network}
                    onPress={async e => {
                      e.preventDefault();
                      selectCurrency(network);
                    }}>
                    <Text
                      style={{
                        ...tw` mr-2 border rounded p-2 text-sm `,
                        ...PaymentStyle.currencyNetwork,
                        ...(payment.currencyNetwork === network &&
                        payment.currency === selectedCurrency.abbreviation
                          ? PaymentStyle.currencyNetworkActive
                          : {}),
                      }}>
                      {network}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        );
      })}

      <View style={tw`my-8`}>
        {payment.currency && (
          <Text style={tw`font-bold text-sm `}>
            Confirm your payment in {payment.currency}({payment.currencyNetwork}
            ). This is Irreversible
          </Text>
        )}
        <View style={tw`flex my-4 justify-center `}>
          <Button
            isValid={payment.currency ? true : false}
            onClick={handleLockCurrency}>
            <Text>
              {payment.currency && 'Confirm'}
              {!payment.currency && 'Proceed'}
            </Text>
          </Button>
        </View>
      </View>
    </>
  );
};

export default Index;
