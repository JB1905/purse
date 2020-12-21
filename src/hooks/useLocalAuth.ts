import { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
// import { AsyncStorage } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../reducers';

export const useLocalAuth = () => {
  const localAuth = useSelector(
    (state: RootState) => state.localAuth.localAuth
  );

  // useEffect(() => {
  //   const checkDeviceAuthOptions = async () => {
  //     const isEnabled = await AsyncStorage.getItem('localAuthentication');

  //     const isSupported = await LocalAuthentication.hasHardwareAsync();

  //     // console.log(isEnabled, !isEnabled === true, isEnabled && isSupported);

  //     if (isEnabled && isSupported) {
  //       const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  //       setLocalAuth(isEnrolled);
  //     }
  //   };

  //   checkDeviceAuthOptions();
  // }, []);

  // const authenticateLocally = async () => {
  //   try {
  //     const res = await LocalAuthentication.authenticateAsync();

  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return {
    localAuth,
    // authenticateLocally,
  };
};
