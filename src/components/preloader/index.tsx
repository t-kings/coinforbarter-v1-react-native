import {usePreloader} from '../../hooks';
import React, {useRef, useEffect} from 'react';
import {View, Animated} from 'react-native';
import {PreloaderStyle} from './style';
import tw from 'tailwind-react-native-classnames';
import {Images} from '../../assets';

export const PreloaderContainer = () => {
  const {isLoading} = usePreloader();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
    ).start();
  }, [fadeAnim]);

  return (
    <>
      {isLoading && (
        <View
          style={{
            ...PreloaderStyle.PreloaderView,
            ...tw`flex justify-center items-center absolute inset-0 z-50`,
          }}>
          <Animated.Image
            source={Images.Preloader}
            style={{
              ...PreloaderStyle.PreloaderImage,
              opacity: fadeAnim,
            }}
          />
        </View>
      )}
    </>
  );
};
