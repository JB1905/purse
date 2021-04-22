import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Switch } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

interface Props {
  readonly title: string;
  readonly toggleState: boolean;
  onToggleChange: (value: boolean) => void;
}

export const ToggleListItem = ({
  title,
  toggleState,
  onToggleChange,
}: Props) => {
  const { colors } = useTheme();

  return (
    <ListItem
      containerStyle={StyleSheet.flatten([
        {
          backgroundColor: colors.card,
        },
        styles.listItem,
      ])}
    >
      <ListItem.Content>
        <ListItem.Title style={{ color: colors.text }} numberOfLines={1}>
          {title}
        </ListItem.Title>
      </ListItem.Content>

      <Switch value={toggleState} onValueChange={onToggleChange} />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 0,
    height: 50,
  },
});
