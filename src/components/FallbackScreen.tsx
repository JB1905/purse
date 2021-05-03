import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { Stack } from '@mobily/stacks';

interface Props {
  readonly title?: string;
  readonly message?: string;
}

const FallbackScreen: React.FC<Props> = ({ title, message, children }) => {
  const { colors } = useTheme();

  return (
    <Stack space={1} style={styles.wrapper}>
      {title && (
        <Text
          style={StyleSheet.flatten([
            {
              color: colors.text,
            },
            styles.title,
          ])}
        >
          {title}
        </Text>
      )}

      {message && (
        <Text
          h3
          h3Style={StyleSheet.flatten([
            {
              color: colors.text,
            },
            styles.message,
          ])}
        >
          {message}
        </Text>
      )}

      {children}
    </Stack>
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
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 30,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.5,
    lineHeight: 24,
  },
});

export default FallbackScreen;
