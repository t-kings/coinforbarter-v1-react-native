import {ViewStyle, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const middleBody: ViewStyle = {
  shadowColor: 'rgba(0, 0, 0, 0.8)',
  shadowOffset: {
    width: -1,
    height: 2,
  },
  shadowOpacity: 2,
  shadowRadius: 3,
  elevation: 5,
};

const c4bHeader: ViewStyle = {
  shadowColor: 'rgba(0, 0, 0, 0.8)',
  shadowOffset: {
    width: -1,
    height: 2,
  },
  shadowOpacity: 2,
  shadowRadius: 3,
  elevation: 5,
  backgroundColor: 'white',
  padding: 20,
};

const c4bBody: ViewStyle = {
  backgroundColor: '#3D0040',
  flex: 1,
  width,
  height,
};

const main: ViewStyle = {
  flex: 1,
  height,
};
const Lock: ViewStyle = {
  shadowColor: 'rgba(0, 0, 0, 0.8)',
  shadowOffset: {
    width: -1,
    height: 2,
  },
  shadowOpacity: 2,
  shadowRadius: 3,
  elevation: 5,
  width: width * 0.6,
};
export const CoinForBarterBodyStyle = {
  c4bHeader,
  middleBody,
  c4bBody,
  Lock,
  main,
};
