import React, { useRef, useLayoutEffect, useState, useCallback } from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';
import {
  Alert,
  ActionSheetIOS,
  findNodeHandle,
  View,
  StyleSheet,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '@react-navigation/native';
import { Box } from '@mobily/stacks';

import HeaderButton from '../../components/HeaderButton';
import Loader from '../../components/Loader';
import FallbackScreen from '../../components/FallbackScreen';
import Button from '../../components/Button';
import SegmentedControl from '../../components/SegmentedControl';
import DataList from '../../components/DataList';

import type { LoggedInProps } from '../../types/Navigation';

import { Collection } from '../../enums/Collection';
import { Route } from '../../enums/Route';

import { useTypedSelector } from '../../hooks/useTypedSelector';

const TABS = ['Expenses List', 'Map'];

const Category = ({ route, navigation }: LoggedInProps<Route.CATEGORY>) => {
  const { id, name } = route.params;

  const { colors } = useTheme();

  // TODO
  const ref = useRef<any>(null);

  const showActionSheet = useCallback(() => {
    const confirmRemove = () => {
      Alert.alert(
        `Do you want to remove ${name}?`,
        'It will remove category with all data',
        [
          {
            text: 'Remove',
            style: 'destructive',
            // onPress: () => {},
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
    };

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          'Edit Category',
          'Add Data for Category',
          'Remove Category with Data',
          'Cancel',
        ],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 3,
        tintColor: colors.primary,
        anchor: findNodeHandle(ref.current) as number,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          navigation.navigate(Route.CATEGORY_MANAGER, { id, name });
        } else if (buttonIndex === 1) {
          navigation.navigate(Route.FINANCE_MANAGER, {
            category: id,
          });
        } else if (buttonIndex === 2) {
          confirmRemove();
        }
      }
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerRight: () => (
        <HeaderButton iconName="more" onPress={showActionSheet} />
      ),
    });
  }, [navigation]);

  useFirestoreConnect([Collection.Categories, Collection.Data]);

  const data = useTypedSelector((state) => state.firestore.ordered.data);

  const [tab, setTab] = useState(0);

  if (!data) {
    return <Loader />;
  }

  // TODO Tabs Component
  const renderTabsView = () => (
    <>
      {/* TODO consider background blur absolute */}
      {/* TODO bg color */}
      <Box paddingY={1} style={{ backgroundColor: '#fff' }}>
        <SegmentedControl
          values={TABS}
          selectedIndex={tab}
          onChange={(e) => setTab(e.nativeEvent.selectedSegmentIndex)}
        />
      </Box>

      {/* TODO */}
      <View style={{ ...styles.tabs, borderColor: colors.border }}>
        {tab === 0 ? (
          <DataList data={data} />
        ) : (
          <MapView style={styles.maps}>
            {data.map((item) => (
              <Marker key={item.id} coordinate={item.coords} />
            ))}
          </MapView>
        )}
      </View>
    </>
  );

  const renderFallbackScreen = () => (
    <FallbackScreen title="Not found data for category">
      <Button
        title="Add it here"
        onPress={() => {
          navigation.navigate(Route.FINANCE_MANAGER, {
            category: route?.params?.id,
          });
        }}
        type="clear"
      />
    </FallbackScreen>
  );

  return data.length > 0 ? renderTabsView() : renderFallbackScreen();
};

const styles = StyleSheet.create({
  tabs: {
    borderTopWidth: StyleSheet.hairlineWidth,
    flex: 1,
  },
  maps: {
    flex: 1,
  },
});

export default Category;
