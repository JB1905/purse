import React, {
  useRef,
  useLayoutEffect,
  useState,
  Suspense,
  lazy,
} from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';
import {
  Alert,
  ActionSheetIOS,
  findNodeHandle,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import HeaderButton from '../../components/HeaderButton';
import Loader from '../../components/Loader';

import type { LoggedInProps } from '../../types/Navigation';

import { Collection } from '../../enums/Collection';
import { Route } from '../../enums/Route';

const FallbackScreen = lazy(() => import('../../components/FallbackScreen'));
const Button = lazy(() => import('../../components/Button'));
const SegmentedControl = lazy(
  () => import('../../components/SegmentedControl')
);

const DataList = lazy(() => import('../../components/DataList'));

const Category = ({ route, navigation }: LoggedInProps<Route.CATEGORY>) => {
  const { id, name } = route.params;

  const { colors } = useTheme();

  const ref = useRef(null);

  const showActionSheet = () => {
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
        anchor: findNodeHandle(ref.current),
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          navigation.navigate(Route.CATEGORY_MANAGER, { id, name });
        } else if (buttonIndex === 1) {
          navigation.navigate(Route.FINANCE_MANAGER, {
            category: id,
          });
        } else if (buttonIndex === 2) {
          Alert.alert(
            `Do you want to remove ${name}?`,
            'It will remove category with all data',
            [
              {
                text: 'Remove',
                style: 'destructive',
                onPress: () => {},
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ]
          );
        }
      }
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerRight: () => (
        // <TouchableOpacity ref={ref} onPress={showActionSheet}>
        //   {/* <Text>aaa</Text> */}
        // </TouchableOpacity>
        <HeaderButton iconName="more" ref={ref} onPress={showActionSheet} />
      ),
    });
  }, [navigation]);

  const [tab, setTab] = useState(0);

  useFirestoreConnect([Collection.Categories, Collection.Data]);

  const data = useSelector((state: any) => state.firestore.ordered.data);

  return data ? (
    // TODO hoc
    <Suspense fallback={<Loader />}>
      {data.length > 0 ? (
        <>
          <SegmentedControl
            values={['Expenses List', 'Map']}
            selectedIndex={tab}
            onChange={(e: any) => setTab(e.nativeEvent.selectedSegmentIndex)}
          />

          <View style={{ borderTopWidth: StyleSheet.hairlineWidth, flex: 1 }}>
            {tab === 0 ? (
              <DataList data={data} />
            ) : (
              <MapView style={{ flex: 1 }}>
                {data.map((item) => (
                  <Marker key={item.id} coordinate={item.coords} />
                ))}
              </MapView>
            )}
          </View>
        </>
      ) : (
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
      )}
    </Suspense>
  ) : (
    <Loader />
  );
};

export default Category;
