import React, {FC} from 'react';
import {Props} from './types';
import {TouchableOpacity, Text} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {CoinForBarterButton} from './style';
export const Button: FC<Props> = ({
  children,
  onClick,
  isValid = true,
  isRed,
}) => {
  if (!isValid) {
    return (
      <TouchableOpacity onPress={onClick}>
        <Text
          style={{
            ...tw`py-2 px-4 w-full  text-sm shadow font-bold text-center`,
            ...CoinForBarterButton.Invalid,
          }}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
  if (isRed) {
    return (
      <TouchableOpacity onPress={onClick}>
        <Text
          style={{
            ...tw`text-center py-2 px-4 w-full text-sm  font-bold`,
            ...CoinForBarterButton.Red,
          }}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onClick}>
      <Text
        style={{
          ...tw`text-center py-2 px-4 w-full text-sm  font-bold`,
          ...CoinForBarterButton.Valid,
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
