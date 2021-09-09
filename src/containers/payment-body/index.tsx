import React, {FC} from 'react';
import tw from 'tailwind-react-native-classnames';
import {Body} from '../body';
import {Props} from './types';
import {Text, View} from 'react-native';
import {convertNumberToStringWithCommas} from '../../utils';
import {CurrencyTypeOptions} from '../../types';
import {PaymentBodyStyle} from './style';
export const PaymentBody: FC<Props> = ({
  children,
  companyLogo,
  companyDescription,
  companyTitle,
  currency,
  paymentAmount,
}) => {
  return (
    <Body
      title={companyTitle || ''}
      description={companyDescription || ''}
      logo={companyLogo || ''}>
      <>
        <View>
          {paymentAmount ? (
            <View
              style={{
                ...tw`my-4 px-4 py-2 flex flex-row items-center justify-between`,
                ...PaymentBodyStyle.amount,
              }}>
              <Text>Amount</Text>
              <View>
                <Text>
                  {currency.type === CurrencyTypeOptions.Fiat
                    ? currency.symbol
                    : ''}{' '}
                  {convertNumberToStringWithCommas(paymentAmount)}{' '}
                  {currency.type === CurrencyTypeOptions.Crypto
                    ? currency.abbreviation
                    : ''}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
        {children}
      </>
    </Body>
  );
};
