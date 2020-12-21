import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps, ThemeContext } from 'react-native-elements';

interface Props extends TextProps {
  readonly message: string;
}

// TODO
const ErrorMessage = ({ message }: Props) => {
  const { theme } = useContext(ThemeContext); // TODO safe

  return (
    <Text
      style={{
        paddingVertical: 6,
        color: theme.colors.error,
        textAlign: 'center',
        fontWeight: '500',
      }}
    >
      {message}
    </Text>
  );
};

const styles = StyleSheet.create({
  message: {
    // paddingVertical: 6,
    // textAlign: 'center',
    // fontWeight: '500',
  },
});

export default ErrorMessage;
