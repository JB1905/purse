import React from 'react';
import {
  StyleSheet,
  ScrollView,
  ScrollViewProps,
  KeyboardAvoidingView,
} from 'react-native';

interface Props extends ScrollViewProps {
  readonly spaces?: boolean;
  readonly full?: boolean;
  readonly keyboard?: boolean;
}

const Container: React.FC<Props> = ({
  contentContainerStyle,
  keyboard = false,
  scrollEnabled = false,
  spaces = false,
  full = false,
  ...props
}) => (
  <KeyboardAvoidingView behavior="padding" enabled={keyboard}>
    <ScrollView
      {...props}
      scrollEnabled={scrollEnabled}
      contentContainerStyle={StyleSheet.flatten([
        contentContainerStyle,
        {
          height: '100%',
          justifyContent: full ? 'center' : 'flex-start',
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
  },
});

export default Container;
