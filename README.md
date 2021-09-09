# CoinForBarter React Native Library

Integrate cryptocurrency payments for goods and services in your React Native Mobile App

![License, MIT](https://img.shields.io/badge/licence-MIT-black) ![npm, coinforbarter-react-native](https://img.shields.io/badge/npm-npm%20install%20coinforbarter--react--native-green) ![yarn, coinforbarter-react-native](https://img.shields.io/badge/yarn-yarn%20add%20coinforbarter--react--native-red)

## Table of Contents
---
  - [About](#about)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Deployment](#deployment)
  - [Built Using](#built-using)
  - [CoinForBarter API References](#coinforbarter-api-references)


## About
---
This is a react native package for implementing CoinForBarter's payment gateway.

## Getting Started
---
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. See references for links to dashboard and API documentation.

### Installation

```bash
$ npm install coinforbarter-react-native

# or
$ yarn add coinforbarter-react-native

```

## Usage
---

```bash

import React from 'react';
import {Text} from 'react-native';

import {CoinForBarterButton} from 'coinforbarter-react-native';

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
# Component is optional, if not provided, the default CoinForBarter button style and text is used
  const component = () => <Text>Pay 1000</Text>;

  return <CoinForBarterButton component={component} config={config} />;
};


export default App;


```



### Config Parameters
---
| Property | Required | Description |
| ---      | ---      | ---         |
| publicKey | true     | your account public key gotten from your dashboard. You can get your PUBLIC_KEY from the CoinForBarter dashboard. Go [here](https://dashboard.coinforbarter.com/settings/api) to get your API Keys. - For  development, Use TEST API Keys. - For production, use LIVE API KEYS.  |
| txRef    | true| a random id to reference this transaction|
|amount| true| amount for this charge|
| currency| true| the currency you have set the amount in|
| customer| true | email address of the customer|
| customerFullName| false|full name of the customer|
| customerPhoneNumber| false | phone number of your customer
| currencies| false|  an array of currencies you want to accept for this transaction, leave empty to accept all currencies|
|callback| true |  a call back function to call after a transaction ends, this is ignored if a redirect url is provided. A data object is passed to the function. See [Callback Param Type](#callback-param-type) for callback data type|



#### Callback Param Type
| Property  | Description |
| ---     | ---         |
|status| status of the transaction. This is either (success. error or cancelled)|,
|transactionId| the transaction id for this transaction, this can be used to verify the transaction using the [verify transaction endpoint](https://developers.coinforbarter.com/docs/overview-transaction-verification/)|
  |txRef| the transaction ref provided by you in config as txRef|
  |currency|the currency the customer chose to pay in|
  |amount| the  amount the customer is to pay  in the currency chosen by the customer |
  |amountReceived| the  amount  the customer paid in the currency chosen by the customer |
  |customer| the customer details|
  | baseAmount| the amount you had set to receive|
  | baseCurrency|the currency that you had set the amount for this transaction in|
## Deployment
---

You can get your PUBLIC_KEY from the CoinForBarter dashboard.

Go [here](https://dashboard.coinforbarter.com/settings/api) to get your API Keys.
- For  development, Use TEST API Keys. 
- For production, use LIVE API KEYS. 







## Built Using
---
- Typescript
- React


## CoinForBarter API References
- [CoinForBarter Developers Doc](https://developers.coinforbarter.com)
- [CoinForBarter API Reference](https://developers.coinforbarter.com/api-reference/)
- [CoinForBarter Inline Payment Doc](https://developers.coinforbarter.com/docs/integration-options-coinforbarter-inline/)
- [CoinForBarter Dashboard](https://dashboard.coinforbarter.com)

## Stay in Touch

- Author - [Nwachukwu, Kingsley Tochukwu](https://linkedin.com/in/tkings)
- Twitter - [@tkings_](https://twitter.com/tkings_)
- Github - [t-kings](https://github.com/tkings)


