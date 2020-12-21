import React from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Icon from '../components/Icon';

interface Props {
  readonly icons: any;
  readonly selectedIcon: any;
  readonly onSelect: any;
}

// TODO
const IconPicker = ({ icons, selectedIcon, onSelect }: Props) => {
  const { colors } = useTheme();

  return (
    <FlatList
      data={Object.entries(icons)}
      numColumns={5}
      keyExtractor={([item]) => item}
      contentContainerStyle={StyleSheet.flatten([styles.list])}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={StyleSheet.flatten([
            {
              backgroundColor: colors.background, // colors.border
            },
            styles.item,
          ])}
          onPress={() => onSelect(item[0])}
        >
          <Icon name={item[0]} color={colors.primary} size={30} />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  item: {
    width: 48,
    height: 48,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default IconPicker;
