import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
  ActivityIndicator,
  ActivityIndicatorProps,
} from 'react-native';
import { useTheme } from '@react-navigation/native';

// TODO
interface Props extends ViewProps, ActivityIndicatorProps {}

const Loader = ({ style, size = 'large', ...props }: Props) => {
  const { colors } = useTheme();

  return (
    <View
      style={StyleSheet.flatten([
        style,
        { backgroundColor: colors.background },
        styles.loader,
      ])}
    >
      <ActivityIndicator {...props} size={size} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    // opacity: 0.9,
  },
});

export default Loader;
