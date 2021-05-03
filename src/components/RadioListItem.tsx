import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

import Icon from './Icon';

interface Props {
  readonly title: string;
  readonly checked: boolean;
}

export const RadioListItem = ({ title, checked }: Props) => {
  const { colors } = useTheme();

  return (
    <ListItem
      // TODO
      // key={button}
      // onPress={() => dispatch({ type: SET_THEME, payload: button })}
      // bottomDivider={index !== APPEARANCE_MODES.length}
      containerStyle={StyleSheet.flatten([
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        styles.container,
      ])}
    >
      <ListItem.Content>
        <ListItem.Title style={{ color: colors.text }}>{title}</ListItem.Title>
      </ListItem.Content>

      {checked && <Icon name="checkmark" color={colors.primary} size={30} />}
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    height: 50,
  },
});
