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

// TODO isIos = Platform.OS === 'ios'

const CancelButton = () => {
  const navigation = useNavigation();

  return (
    <HeaderButton title="Cancel" iconName="close" onPress={navigation.goBack} />
  );
};

const SignUpScreen = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen
      name={Route.SIGN_UP}
      component={SignUp}
      options={() => ({
        title: '',
        headerRight: () => Platform.OS === 'ios' && <CancelButton />,
      })}
    />
  </NativeStack.Navigator>
);

const ResetPasswordScreen = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen
      name={Route.RESET_PASSWORD}
      component={ResetPassword}
      options={() => ({
        title: '',
        headerRight: () => Platform.OS === 'ios' && <CancelButton />,
      })}
    />
  </NativeStack.Navigator>
);

export const LoggedOut = () => (
  <NativeStack.Navigator
    initialRouteName={Route.SIGN_IN}
    screenOptions={{
      gestureEnabled: false,
      stackPresentation: Platform.OS === 'ios' ? 'formSheet' : 'push',
    }}
  >
    <NativeStack.Screen
      name={Route.SIGN_IN}
      component={SignIn}
      options={{ headerShown: false }}
    />

    <NativeStack.Screen
      name={Route.SIGN_UP}
      component={SignUpScreen}
      options={{ headerShown: Platform.OS === 'ios' }}
    />

    <NativeStack.Screen
      name={Route.RESET_PASSWORD}
      component={ResetPasswordScreen}
      options={{ headerShown: Platform.OS === 'ios' }}
    />
  </NativeStack.Navigator>
);
