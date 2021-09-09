import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

const Button: ViewStyle = {
  backgroundColor: '#E9BE00',
  shadowColor: 'rgba(0, 0, 0, 0.8)',
  shadowOffset: {
    width: -1,
    height: 2,
  },
  shadowOpacity: 2,
  shadowRadius: 3,
  elevation: 5,
  borderRadius: 3,
  paddingVertical: 5,
  paddingHorizontal: 10,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
};

const ButtonText: TextStyle = {
  fontWeight: 'bold',
  fontSize: 14,
  textAlign: 'center',
  color: '#3D0040',
};

const Image: ImageStyle = {
  marginRight: 5,
};

export const coinForBarterStyle = {
  Button,
  ButtonText,
  Image,
};
