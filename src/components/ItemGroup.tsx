import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation, useTheme } from '@react-navigation/native';

interface Props {
  readonly title: string;
  readonly items: any[];
}

// TODO connect with ToggleListItem and RadioListItem as compound components
const ItemGroup = ({ title, items, style }: Props) => {
  const { colors } = useTheme();

  const navigation = useNavigation();

  return (
    <View style={style}>
      {/* TODO move to Label */}
      <Text
        style={StyleSheet.flatten([{ color: colors.text }, styles.groupTitle])}
      >
        {title}
      </Text>

      <View style={styles.groupContainer}>
        {items.map(({ title, screen }, index) => (
          <ListItem
            key={title}
            bottomDivider={index !== items.length - 1}
            onPress={() => navigation.navigate(screen)}
            containerStyle={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              // TODO
              // borderLeftColor: colors.card,
              // borderLeftWidth: 20,
            }}
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: colors.text }}>
                {title}
              </ListItem.Title>
            </ListItem.Content>

            {/* TODO */}
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>

      {/* TODO add hint component */}
    </View>
  );
};

const styles = StyleSheet.create({
  groupTitle: {
    marginBottom: 8,
    marginHorizontal: 15,
    textTransform: 'uppercase',
    // fontWeight: '500',
    fontSize: 13,
    opacity: 0.5,
  },
  groupContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});

export default ItemGroup;
