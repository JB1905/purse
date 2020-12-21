import React from 'react';
import { Text, RefreshControl, View, StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

// TODO
const DataList = ({ data }: any) => {
  return (
    <SwipeListView
      refreshControl={<RefreshControl refreshing={true} />}
      data={data}
      renderItem={(data, rowMap) => (
        <View>
          <Text>{data.item.title}</Text>
        </View>
      )}
      renderHiddenItem={(data, rowMap) => (
        <View>{/* <Text>Left</Text>
          <Text>Right</Text> */}</View>
      )}
      leftOpenValue={75}
      rightOpenValue={-75}
    />
  );
};

// const styles = StyleSheet.create({});
export default DataList;
