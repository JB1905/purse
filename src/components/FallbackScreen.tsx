import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

interface Props {
  readonly title?: string;
  readonly message?: string;
}

// TODO
const FallbackScreen: React.FC<Props> = ({ title, message, children }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {title && (
        <Text
          style={{
            fontSize: 22,
            fontWeight: '500',
            textAlign: 'center',
            lineHeight: 30,
            marginBottom: 8,
            color: colors.text,
          }}
        >
          {title}
        </Text>
      )}

      {message && (
        <Text
          h3
          h3Style={{
            fontSize: 16,
            textAlign: 'center',
            opacity: 0.5,
            lineHeight: 24,
            color: colors.text,
          }}
        >
          {message}
        </Text>
      )}

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.5,
    lineHeight: 24,
  },
});

export default FallbackScreen;
