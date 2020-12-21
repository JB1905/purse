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
    <View>
      {title && (
        <Text
          style={{
            color: colors.text,
            // TODO title
          }}
        >
          {title}
        </Text>
      )}

      <View
        style={{
          backgroundColor: colors.card,
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
    fontWeight: '500',
    fontSize: 14,
    opacity: 0.5,
    // marginVertical: 6,
    marginHorizontal: 20,
  },
  content: {
    height: 370,
    overflow: 'hidden',
  },
});

export default SectionBox;
