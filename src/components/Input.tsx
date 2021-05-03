import React from 'react';
import { StyleSheet } from 'react-native';
import { Input as BaseInput, InputProps } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { FieldError } from 'react-hook-form';

import Icon from './Icon';

import { useElementsTheme } from '../hooks/useElementsTheme';

interface Props extends Omit<InputProps, 'errorMessage'> {
  readonly flat?: boolean;
  readonly errorMessage?: FieldError | string;
}

const Input = ({
  containerStyle,
  inputContainerStyle,
  inputStyle,
  flat,
  errorMessage,
  // style,
  ...props
}: Props) => {
  const { colors } = useTheme();

  const { theme } = useElementsTheme();

  return (
    <BaseInput
      {...props}
      // errorMessage={errorMessage as string} // TODO
      leftIcon={
        errorMessage &&
        flat && (
          <Icon
            name="warning"
            // size={20}
            color="red"
            style={{ marginRight: 10 }}
          />
        )
      }
      containerStyle={StyleSheet.flatten([
        containerStyle,
        flat
          ? {
              paddingLeft: 0,
              paddingRight: 0,
              // marginVertical: 10,
            }
          : {
              paddingHorizontal: 0,
              marginBottom: -12, // TODO
              backgroundColor: colors.background,
              padding: 0,
            },
      ])}
      inputContainerStyle={StyleSheet.flatten([
        inputContainerStyle,
        flat
          ? {
              paddingHorizontal: 20,
              backgroundColor: colors.card,
              borderTopColor: colors.border,
              borderBottomColor: colors.border,
              borderTopWidth: StyleSheet.hairlineWidth,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }
          : {
              height: 45,
              paddingHorizontal: 10,
              borderColor: errorMessage ? theme.colors.error : colors.border,
              borderWidth: 2,
              borderTopWidth: 2,
              borderBottomWidth: 2,
              borderRadius: 10,
            },
      ])}
      labelStyle={StyleSheet.flatten([
        flat
          ? {
              textTransform: 'uppercase',
              fontWeight: '400',
              fontSize: 14,
              color: colors.text,
              opacity: 0.5,
              marginBottom: 6,
              // marginVertical: 6, // TODO
              marginHorizontal: 20,
            }
          : {
              display: 'none',
            },
      ])}
      // placeholderTextColor={colors.text}
      inputStyle={StyleSheet.flatten([
        inputStyle,
        {
          color: colors.text,
        },
        flat
          ? {
              // paddingVertical: 12,
              paddingVertical: 0,
              fontSize: 18,
            }
          : {
              paddingHorizontal: 2,
            },
      ])}
    />
  );
};

// const styles = StyleSheet.create({});

export default Input;
