import {TextStyle, ViewStyle} from 'react-native';
import {Dimensions} from 'react-native';
const width = Dimensions.get('window').width;

const notification: ViewStyle = {
  backgroundColor: 'white',
  borderRadius: 3,
  shadowColor: 'rgba(0, 0, 0, 0.8)',
  shadowOffset: {
    width: -1,
    height: 2,
  },
  shadowOpacity: 2,
  shadowRadius: 3,
  elevation: 5,
  width: width / 2,
};

const notificationAnimation: ViewStyle = {
  height: 3,
  backgroundColor: '#3D0040',
  position: 'absolute',
};

const notificationAnimationH2: TextStyle = {
  backgroundColor: 'rgb(233, 190, 0)',
  marginTop: 3,
  position: 'absolute',
  right: 0,
  left: 0,
  width,
};

const notificationAnimationP: TextStyle = {
  color: '#3D0040',
};
const absolute: ViewStyle = {
  position: 'absolute',
};
const movingSlider: ViewStyle = {
  backgroundColor: 'white',
  overflow: 'hidden',
  width: 3,
};

const movingSliderText: TextStyle = {
  color: 'white',
};

export const NotificationStyle = {
  notificationAnimation,
  movingSlider,
  movingSliderText,
  notificationAnimationH2,
  notificationAnimationP,
  absolute,
  notification,
};
