/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Text} from 'react-native';

import {CoinForBarterButton} from './src';

const App = () => {
  const config = {
    publicKey: 'xxxxxxxxxxxxxxxxxxxx',
    txRef: 'xxxxxxxxxxx',
    amount: 10000,
    currency: 'NGN',
    customer: 'example@example.com',
    customerFullName: 'John Doe',
    callback: data => {
      console.log(data);
    },
    currencies: ['BTC', 'DOGE'],
  };

  const component = () => <Text>Pay 1000</Text>;

  return <CoinForBarterButton component={component} config={config} />;
};

export default App;
