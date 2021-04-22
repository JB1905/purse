import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native-elements';

import { useElementsTheme } from '../hooks/useElementsTheme';

interface Props extends TextProps {
  readonly message: string;
}

const ErrorMessage = ({ message }: Props) => {
  const { theme } = useElementsTheme();

  return (
    <Text
      style={StyleSheet.flatten([
        styles.message,
        {
          color: theme.colors.error,
        },
      ])}
    >
      {message}
    </Text>
  );
};

const styles = StyleSheet.create({
  message: {
    paddingVertical: 6,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default ErrorMessage;
