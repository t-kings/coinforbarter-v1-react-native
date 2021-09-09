import React, {FC, useState} from 'react';
import {Image, Text, View} from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface Props {
  url?: string;
  title?: string;
  classStyles: string;
}

const getInitials = (phrase: string): string => {
  let stringArr;
  if (phrase.includes(' ')) {
    stringArr = phrase.split(' ');
  } else if (phrase.includes('-')) {
    stringArr = phrase.split('-');
  } else if (phrase.includes('.')) {
    stringArr = phrase.split('.');
  } else {
    stringArr = [phrase[0], phrase[phrase.length - 1]];
  }
  return `${stringArr[0][0]}${stringArr[1][0]}`;
};

const colors = ['bg-blue-900', 'bg-black', 'bg-pink-900', 'bg-green-900'];
export const Logo: FC<Props> = ({url, title, classStyles}) => {
  const [color] = useState(colors[Math.floor(Math.random() * colors.length)]);
  const initials: string = getInitials(title || 'CoinForBarter');
  return (
    <>
      {url && (
        <Image
          source={{uri: url}}
          style={tw`w-16 rounded-full h-16 object-cover`}
        />
      )}
      {!url && (
        <View style={tw`${classStyles}`}>
          <View
            style={tw`${color} text-white uppercase w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold`}>
            <Text>{initials[0]}</Text>
            <Text>{initials[1]}</Text>
          </View>
        </View>
      )}
    </>
  );
};
