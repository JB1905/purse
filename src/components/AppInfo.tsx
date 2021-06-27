import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import * as Application from 'expo-application';
import { useTheme } from '@react-navigation/native';

const AppInfo = () => {
  const { colors } = useTheme();

  return (
    <Text style={StyleSheet.flatten([styles.info, { color: colors.text }])}>
      {Application.applicationName} Version {Application.nativeApplicationVersion} (
      {Application.nativeBuildVersion})
    </Text>
  );
};

const styles = StyleSheet.create({
  info: {
    textAlign: 'center',
    opacity: 0.5,
  },
});

export default AppInfo;
