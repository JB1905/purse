import React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import AppLoading from 'expo-app-loading';

import { LoggedIn } from './logged-in';
import { LoggedOut } from './logged-out';

import type { AppParamList } from '../types/Navigation';

import { Route } from '../enums/Route';

import { useTypedSelector } from '../hooks/useTypedSelector';

const NativeStack = createNativeStackNavigator<AppParamList>();

const Layout = () => {
  const auth = useTypedSelector((state) => state.firebase.auth);

  if (!isLoaded(auth)) {
    return <AppLoading autoHideSplash />;
  }

  return (
    <NativeStack.Navigator
      screenOptions={{ headerShown: false, stackAnimation: 'none' }}
    >
      {isEmpty(auth) ? (
        <NativeStack.Screen name={Route.LOGGED_OUT} component={LoggedOut} />
      ) : (
        <NativeStack.Screen name={Route.LOGGED_IN} component={LoggedIn} />
      )}
    </NativeStack.Navigator>
  );
};

export default Layout;
