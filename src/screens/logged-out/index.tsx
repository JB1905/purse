import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { useNavigation } from '@react-navigation/native';

import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';

import HeaderButton from '../../components/HeaderButton';

import type { LoggedOutParamList } from '../../types/Navigation';

import { Route } from '../../enums/Route';

const NativeStack = createNativeStackNavigator<LoggedOutParamList>();

// TODO move to utils/constants
const isIos = Platform.OS === 'ios';

// TODO add confirm on cancel
const CancelButton = () => {
  const navigation = useNavigation();

  return (
    // TODO disable on loading e.g. resetting password
    <HeaderButton title="Cancel" iconName="close" onPress={navigation.goBack} />
  );
};

// TODO add type
const modalScreenOptions = {
  title: '',
  headerShown: isIos,
  headerRight: () => isIos && <CancelButton />,
};

export const LoggedOut = () => (
  <NativeStack.Navigator
    initialRouteName={Route.SIGN_IN}
    screenOptions={{
      stackPresentation: isIos ? 'formSheet' : 'push',
    }}
  >
    <NativeStack.Screen
      name={Route.SIGN_IN}
      component={SignIn}
      options={{ headerShown: false }}
    />

    <NativeStack.Screen
      name={Route.SIGN_UP}
      component={SignUp}
      options={modalScreenOptions}
    />

    <NativeStack.Screen
      name={Route.RESET_PASSWORD}
      component={ResetPassword}
      options={modalScreenOptions}
    />
  </NativeStack.Navigator>
);
