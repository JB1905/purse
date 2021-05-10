import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { StackNavigationState, TypedNavigator } from '@react-navigation/native';

import HeaderButton from '../../components/HeaderButton';

import Categories from './Categories';
import Category from './Category';

import Finances from './Finances';

import Analytics from './Analytics';

import Search from './Search';

import type { MainParamList } from '../../types/Navigation';

import { Route } from '../../enums/Route';

const NativeStack = createNativeStackNavigator<MainParamList>();

// TODO any
const shareRoutesBetweenTabs = (
  Stack: TypedNavigator<any, StackNavigationState<any>, any, any, any>
) => (
  <>
    <Stack.Screen
      name={Route.FINANCES}
      component={Finances}
      options={({ navigation }) => ({
        ...headerCustomOptions(navigation),
        headerRight: () => (
          <HeaderButton
            iconName="add-circle"
            onPress={() => navigation.navigate(Route.FINANCE_MANAGER)}
          />
        ),
      })}
    />

    <Stack.Screen
      name={Route.CATEGORIES}
      component={Categories}
      options={({ navigation }) => ({
        headerLargeTitle: true,
        ...headerCustomOptions(navigation),
        headerRight: () => (
          <HeaderButton
            iconName="add-circle"
            onPress={() => navigation.navigate(Route.CATEGORY_MANAGER)}
          />
        ),
      })}
    />

    <Stack.Screen
      name={Route.CATEGORY}
      component={Category}
      options={({ route }) => ({
        title: route.params.name,
      })}
    />
  </>
);

const headerCustomOptions = (navigation: any) => ({
  headerLeft: () => (
    <HeaderButton
      iconName="settings"
      onPress={() => navigation.navigate(Route.SETTINGS)}
    />
  ),
});

export const FinancesScreen = () => (
  <NativeStack.Navigator>
    {shareRoutesBetweenTabs(NativeStack)}
  </NativeStack.Navigator>
);

export const AnalyticsScreen = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen
      name={Route.ANALYTICS} // TODO
      component={Analytics}
      options={({ navigation }) => ({
        headerLargeTitle: true,
        ...headerCustomOptions(navigation),
      })}
    />
  </NativeStack.Navigator>
);

export const CategoriesScreen = () => (
  <NativeStack.Navigator initialRouteName={Route.CATEGORIES}>
    {shareRoutesBetweenTabs(NativeStack)}
  </NativeStack.Navigator>
);

export const SearchScreen = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen
      name={Route.SEARCH} // TODO
      component={Search}
      options={({ navigation }) => ({
        searchBar: {},
        headerLargeTitle: true,
        ...headerCustomOptions(navigation),
      })}
    />

    {shareRoutesBetweenTabs(NativeStack)}
  </NativeStack.Navigator>
);
