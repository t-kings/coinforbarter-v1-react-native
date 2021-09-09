import React, {FC} from 'react';
import {Logo} from '../logo';
import {Images} from '../../assets';
import {View, Text, Image, ScrollView} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {CoinForBarterBodyStyle} from './style';

interface Props {
  children: JSX.Element;
  logo?: string;
  description?: string;
  title?: string;
}

export const Body: FC<Props> = ({children, logo, description, title}) => {
  return (
    <View style={CoinForBarterBodyStyle.main}>
      <ScrollView style={CoinForBarterBodyStyle.c4bBody}>
        <View style={{...tw`w-full my-8`, ...CoinForBarterBodyStyle.c4bHeader}}>
          <View style={tw`flex flex-row items-center justify-center w-full`}>
            {logo ? <Logo title={title} url={logo} classStyles="" /> : null}
            {title ? (
              <Text
                style={{
                  ...tw`text-xl my-0`,
                }}>
                {title}
              </Text>
            ) : null}
          </View>
          {description ? (
            <Text style={tw`text-center  text-xs`}>{description}</Text>
          ) : null}
        </View>
        <View
          style={{
            ...tw`bg-white w-full p-4 `,
            ...CoinForBarterBodyStyle.middleBody,
          }}>
          {children}
        </View>
        <View style={tw`mt-8 flex flex-col justify-center items-center`}>
          <View
            style={{
              ...tw`bg-white py-2 px-4 flex flex-row justify-between items-center `,
              ...CoinForBarterBodyStyle.Lock,
            }}>
            <Image source={Images.Lock} style={tw` mr-2 `} />
            <Text style={tw`text-sm ml-2`}>Secured by CoinForBarter</Text>
          </View>
          <View>
            <Text style={tw`text-white text-xs text-center my-2 mb-8`}>
              https://coinforbarter.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
