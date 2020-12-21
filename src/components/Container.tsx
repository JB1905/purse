import React from 'react';
import {
  StyleSheet,
  ScrollView,
  ScrollViewProps,
  KeyboardAvoidingView,
} from 'react-native';
// import { useTheme } from '@react-navigation/native';

interface Props extends ScrollViewProps {
  readonly spaces?: boolean;
  readonly full?: boolean;
  readonly keyboard?: boolean;
}

const Container = ({
  contentContainerStyle,
  keyboard = false,
  scrollEnabled = false,
  spaces = false,
  full = false,
  ...props
}: Props) => (
  <KeyboardAvoidingView
    behavior="padding"
    enabled={keyboard}
  >
    <ScrollView
      {...props}
      scrollEnabled={scrollEnabled}
      contentContainerStyle={StyleSheet.flatten([
        contentContainerStyle,
        {
          justifyContent: full ? 'center' : 'flex-start',
          height: '100%',
          // flex: full ? 1 : 0,
          // backgroundColor: colors.card,
          maxWidth: full ? 500 : undefined,
          alignSelf: full ? 'center' : undefined,
          width: full ? '100%' : undefined,
        },
      ])}
    />
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    // paddingHorizontal: spaces ? 30 : 0,
    // paddingVertical: 20,
  },
});

export default Container;
