import React from 'react';
import { StyleSheet } from 'react-native';
import SegmentedControlIOS, {
  SegmentedControlProps,
} from '@react-native-community/segmented-control';

const SegmentedControl = (props: SegmentedControlProps) => (
  <SegmentedControlIOS
    {...props}
    style={StyleSheet.flatten([styles.control])}
  />
);

const styles = StyleSheet.create({
  control: {
    alignSelf: 'center',
    maxWidth: 350,
    width: '100%',
  },
});

export default SegmentedControl;
