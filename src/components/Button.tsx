import React, { useMemo } from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Button as BaseButton, ButtonProps } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

// TODO
// type Variant = 'default' | 'danger' | 'cancel'

const Button = ({
  type = 'solid',
  containerStyle,
  buttonStyle,
  titleStyle,
  ...props
}: ButtonProps) => {
  const { colors } = useTheme();

  const isClear = useMemo(() => type === 'clear', []);

  return (
    <BaseButton
      {...props}
      type={type}
      background={TouchableNativeFeedback.Ripple(colors.background, false)}
      useForeground={isClear}
      containerStyle={StyleSheet.flatten([
        containerStyle,
        { marginVertical: 0 },
      ])}
      buttonStyle={StyleSheet.flatten([
        buttonStyle,
        { backgroundColor: isClear ? 'transparent' : colors.primary },
      ])}
      titleStyle={StyleSheet.flatten([
        titleStyle,
        {
          color: isClear ? colors.primary : '#fff', // TODO theme
          fontWeight: isClear ? '400' : '500',
          paddingBottom: isClear ? 0 : 3,
        },
      ])}
    />
  );
};

export default Button;
