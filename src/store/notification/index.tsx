/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useState,
  FC,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {NotificationType, Props} from './types';

import {Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
import {Images} from '../../assets';
import {Image, Text, TouchableOpacity, View, Animated} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {NotificationStyle} from './style';

const notificationActions: NotificationType = {
  error: (message: string): void => {},
  success: (message: string): void => {},
  setExpiryTime: (expiryTime: number): void => {},
};

export const NotificationContext =
  createContext<NotificationType>(notificationActions);

export const NotificationProvider: FC<Props> = ({children}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rightAnim = useRef(new Animated.Value(0)).current;
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [expiryTime, setExpiryTime] = useState(0);
  const error = useCallback((m: string) => {
    setIsSuccess(false);
    setMessage(m);
  }, []);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const success = useCallback((m: string) => {
    setIsSuccess(true);
    setMessage(m);
  }, []);

  const showNotification = () => {
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  useEffect(() => {
    if (message) {
      showNotification();
    }
  }, [message]);

  useEffect(() => {
    if (expiryTime !== 0) {
      setInterval(() => {
        const dateFromExpiryTIme = new Date(
          new Date(expiryTime).getTime() - new Date().getTime(),
        );
        setHours(dateFromExpiryTIme.getHours());
        setMinutes(dateFromExpiryTIme.getMinutes());
        setSeconds(dateFromExpiryTIme.getSeconds());
      }, 1000);
    }
  }, [expiryTime]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: width,
        duration: 100,
        useNativeDriver: false,
      }),
    ).start();
  }, [fadeAnim]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rightAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
    ).start();
  }, [rightAnim]);

  return (
    <NotificationContext.Provider value={{success, error, setExpiryTime}}>
      {expiryTime !== 0 && (
        <View
          style={{
            ...tw`absolute top-0 right-0 z-50 left-0`,
            ...NotificationStyle.notificationAnimation,
          }}>
          <Animated.View
            style={{
              ...tw`absolute top-0 bottom-0`,
              ...NotificationStyle.movingSlider,
              width: fadeAnim,
              right: rightAnim,
            }}>
            <Text style={{...NotificationStyle.movingSliderText}}> </Text>
          </Animated.View>
          <View
            style={{
              ...NotificationStyle.notificationAnimationH2,
            }}>
            <Text
              style={{
                ...tw`text-center  p-2 text-xs`,
                ...NotificationStyle.notificationAnimationP,
              }}>
              This payment will expire in {hours}:{minutes}:{seconds}
            </Text>
          </View>
        </View>
      )}
      {message ? (
        <View
          style={{...tw`top-0 right-0 z-50`, ...NotificationStyle.absolute}}>
          <View
            style={{
              ...tw`flex flex-col m-8 p-4 relative`,
              ...NotificationStyle.notification,
            }}>
            <TouchableOpacity
              style={tw`absolute top-0 right-0 m-2`}
              onPress={() => {
                setMessage('');
              }}>
              <Image source={Images.Close} />
            </TouchableOpacity>
            {isSuccess && (
              <View style={tw`flex flex-row items-center justify-start`}>
                <View style={tw`mr-4`}>
                  <Image style={tw`h-10`} source={Images.SuccessBars} />
                </View>
                <View>
                  <Text style={tw`text-green-900 text-sm`}>Success</Text>
                  <Text style={tw`text-xs `}>
                    {message.replace(message[0], message[0].toUpperCase())}
                  </Text>
                </View>
              </View>
            )}

            {!isSuccess && (
              <View style={tw`flex  flex-row items-center justify-start`}>
                <View style={tw`mr-4`}>
                  <Image style={tw` h-10`} source={Images.ErrorBars} />
                </View>
                <View>
                  <Text style={tw`text-red-900 text-sm`}>Error!</Text>
                  <Text style={tw`text-xs `}>
                    {message.replace(message[0], message[0].toUpperCase())}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      ) : null}
      {children}
    </NotificationContext.Provider>
  );
};
