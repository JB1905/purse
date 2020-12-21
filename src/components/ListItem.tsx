import React from 'react';
import {
  StyleSheet,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';
import { ListItem as BaseListItem, ListItemProps } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

const ListItem = ({
  title,
  subtitle,
  titleStyle,
  subtitleStyle,
  containerStyle,
  ...props
}: ListItemProps) => {
  const { colors } = useTheme();

  return (
    <BaseListItem
      {...props}
      containerStyle={StyleSheet.flatten([
        containerStyle,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ])}
      bottomDivider
      Component={
        // TODO isIos
        Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback
      }
    >
      <BaseListItem.Content>
        <BaseListItem.Title
          style={StyleSheet.flatten([titleStyle, { color: colors.text }])}
        >
          {title}
        </BaseListItem.Title>

        <BaseListItem.Subtitle
          style={StyleSheet.flatten([subtitleStyle, { color: colors.text }])}
        >
          {subtitle}
        </BaseListItem.Subtitle>
      </BaseListItem.Content>
    </BaseListItem>
  );
};

export default ListItem;
