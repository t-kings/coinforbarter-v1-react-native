import React, {FC} from 'react';
import {View, Text} from 'react-native';
import tw from 'tailwind-react-native-classnames';

export const PaymentErrors: FC<{
  errors: Record<string, string[]>;
}> = ({errors}) => {
  return (
    <View>
      {Object.values(errors).length > 0 && (
        <View style={tw`bg-red-300 py-2 px-4`}>
          {Object.values(errors).map(item =>
            item.map(subItem => (
              <Text style={tw`text-red-800 my-2 text-sm`} key={subItem}>
                {subItem}
              </Text>
            )),
          )}
        </View>
      )}
    </View>
  );
};
