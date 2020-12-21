import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { MainScreen } from './TabNavigation';
import { CategoryManagerStack, FinanceManagerStack } from './Stack';
import Settings from './Settings';

import type { LoggedInParamList } from '../../types/Navigation';

import { Route } from '../../enums/Route';

const NativeStack = createNativeStackNavigator<LoggedInParamList>();

export const LoggedIn = () => (
  <NativeStack.Navigator
    screenOptions={{
      headerShown: false,
      stackPresentation: Platform.OS === 'ios' ? 'formSheet' : 'push',
      gestureEnabled: false,
    }}
  >
    <NativeStack.Screen name={Route.MAIN} component={MainScreen} />

    <NativeStack.Screen
      name={Route.CATEGORY_MANAGER}
      component={CategoryManagerStack}
    />

    <NativeStack.Screen
      name={Route.FINANCE_MANAGER}
      component={FinanceManagerStack}
    />

    <NativeStack.Screen name={Route.SETTINGS} component={Settings} />
  </NativeStack.Navigator>
);
