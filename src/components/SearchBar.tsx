import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  SearchBar as BaseSearchBar,
  SearchBarProps,
} from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

// TODO
const SearchBar = ({
  containerStyle,
  inputContainerStyle,
  // cancelButtonTitle = 'Cancel',
  // clearButtonMode = 'never',
  leftIconContainerStyle,
  showCancel = true,
  ...props
}: SearchBarProps) => {
  const { colors } = useTheme();

  return (
    <BaseSearchBar
      {...props}
      platform={Platform.OS === 'ios' ? 'ios' : 'android'}
      containerStyle={{
        paddingHorizontal: 10, // TODO only ios
        backgroundColor: 'transparent',
        // alignSelf: 'center',
        // maxWidth: 500,
      }}
      inputContainerStyle={{ backgroundColor: colors.border, 
        height: 40 // TODO only ios
       }}
      inputStyle={{ color: colors.text }}
      cancelButtonProps={{ color: colors.primary }}
    />
  );
};

// const styles = StyleSheet.create({});

export default SearchBar;
