import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface Props {
  readonly title?: string;
}

// TODO
const SectionBox: React.FC<Props> = ({
  title,
  // headerActions,
  children,
}) => {
  const { colors } = useTheme();

  return (
    <View
    // style={{ marginTop: 10 }} // TODO
    >
      {/* TODO move to Label */}
      {title && (
        <Text
          style={{
            color: colors.text,
            ...styles.title, // TODO
            // TODO title
          }}
        >
          {title}
        </Text>
      )}

      <View
        style={{
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderBottomColor: colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderBottomWidth: StyleSheet.hairlineWidth,
          // TODO content
        }}
      >
        {children}
      </View>
    </View>
  );
};

// TODO StyleSheet
const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    // fontWeight: '500',
    fontSize: 14,
    opacity: 0.5,
    marginBottom: 6,
    marginHorizontal: 20,
  },
  content: {
    height: 370,
    overflow: 'hidden',
  },
});

export default SectionBox;
