import React from 'react';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { MainScreen } from './TabNavigation';
import CategoryManager from './CategoryManager';
import FinanceManager from './FinanceManager';
import Settings from './Settings';

import type { LoggedInParamList } from '../../types/Navigation';

import { Route } from '../../enums/Route';

const NativeStack = createNativeStackNavigator<LoggedInParamList>();

export const LoggedIn = () => (
  <NativeStack.Navigator
    screenOptions={{
      stackPresentation: Platform.OS === 'ios' ? 'formSheet' : 'push',
      headerShown: true, // TODO
    }}
  >
    <NativeStack.Screen
      name={Route.MAIN}
      component={MainScreen}
      options={{ headerShown: false }}
    />

    <NativeStack.Screen
      name={Route.CATEGORY_MANAGER}
      component={CategoryManager}
    />

    <NativeStack.Screen
      name={Route.FINANCE_MANAGER}
      component={FinanceManager}
    />

    <NativeStack.Screen
      name={Route.SETTINGS}
      component={Settings}
      options={{ headerShown: false }}
    />
  </NativeStack.Navigator>
);
