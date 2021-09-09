import {ImageStyle, ViewStyle} from 'react-native';

const PreloaderView: ViewStyle = {
  backgroundColor: 'rgba(64, 0, 67, 0.7) ',
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
};
const PreloaderImage: ImageStyle = {
  width: 40,
};

export const PreloaderStyle = {
  PreloaderImage,
  PreloaderView,
};
