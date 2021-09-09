import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

const currencyOption: ViewStyle = {
  backgroundColor: '#D9C2DB',
  borderRadius: 3,
};

const currencyNetworkActive: TextStyle = {
  backgroundColor: '#3D0040',
  color: 'white',
};

const currencyNetwork: TextStyle = {
  color: '#3D0040',
  borderColor: '#3D0040',
};

const addressCopy: TextStyle = {
  borderWidth: 1,
  borderColor: '#CACACA',
  borderRadius: 3,
  fontSize: 14,
};

const addressCopyButton: TextStyle = {
  backgroundColor: '#3D0040',
};

const addressReceivedInfo: TextStyle = {
  backgroundColor: '#E6E2CF',
};

const barCode: ImageStyle = {
  width: 250,
  height: 250,
};

export const PaymentStyle = {
  addressReceivedInfo,
  addressCopyButton,
  addressCopy,
  currencyNetwork,
  currencyNetworkActive,
  currencyOption,
  barCode,
};
