import {TextStyle} from 'react-native';

const Valid: TextStyle = {
  backgroundColor: '#E9BE00',
  borderRadius: 3,
  shadowColor: 'rgba(0, 0, 0, 0.8)',
  shadowOffset: {
    width: -1,
    height: 2,
  },
  shadowOpacity: 2,
  shadowRadius: 3,
  elevation: 5,
  color: '#3D0040',
};

const Invalid: TextStyle = {
  backgroundColor: '#CACACA',
  borderRadius: 3,
  shadowColor: 'rgba(0, 0, 0, 0.8)',
  shadowOffset: {
    width: -1,
    height: 2,
  },
  shadowOpacity: 2,
  shadowRadius: 3,
  elevation: 5,
  color: '#3D0040',
};

const Red: TextStyle = {
  backgroundColor: 'red',
  borderRadius: 3,
  shadowColor: 'rgba(0, 0, 0, 0.8)',
  shadowOffset: {
    width: -1,
    height: 2,
  },
  shadowOpacity: 2,
  shadowRadius: 3,
  elevation: 5,
  color: 'white',
};

export const CoinForBarterButton = {
  Invalid,
  Valid,
  Red,
};
