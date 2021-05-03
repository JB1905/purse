import React from 'react';
import { StyleSheet } from 'react-native';
import NativeColorPicker from 'native-color-picker';
import { Props } from 'native-color-picker/lib/interfaces/Props';

const ColorPicker = (props: Props) => (
  <NativeColorPicker
    {...props}
    sort
    // gradient
    shadow
    itemSize={46}
    markerType="border"
    markerDisplay="#fff"
    scrollEnabled={false}
    contentContainerStyle={StyleSheet.flatten([styles.contentContainer])}
  />
);

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
});

export default ColorPicker;
