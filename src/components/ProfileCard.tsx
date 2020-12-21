import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Avatar, ListItem, ListItemProps } from 'react-native-elements';
import gravatar from 'gravatar';

// TODO
interface Props extends ListItemProps {
  readonly data: any;
}

const ProfileCard = ({ data, style, ...props }: Props) => {
  const { colors } = useTheme();

  const formattedAvatarInitials = useMemo(
    () => `${data?.name[0] ?? ''}${data?.surname[0] ?? ''}`,
    []
  );

  return (
    <ListItem
      {...props}
      containerStyle={StyleSheet.flatten([
        { backgroundColor: colors.card },
        styles.containerStyle,
      ])}
      style={StyleSheet.flatten([style, styles.profileCardStyle])}
    >
      <Avatar
        title={formattedAvatarInitials}
        source={{ uri: gravatar.url(data.email, { protocol: 'https' }) }}
        size="large"
        rounded
      />

      <ListItem.Content>
        <ListItem.Title
          style={StyleSheet.flatten([
            { color: colors.text },
            styles.titleStyle,
          ])}
        >
          {`${data.name} ${data.surname}`}
        </ListItem.Title>

        <ListItem.Subtitle
          style={StyleSheet.flatten([
            { color: colors.text },
            styles.subtitleStyle,
          ])}
        >
          {data.email}
        </ListItem.Subtitle>
      </ListItem.Content>

      {/* <ListItem.Chevron /> */}
    </ListItem>
  );
};

const styles = StyleSheet.create({
  profileCardStyle: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  containerStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.01,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleStyle: {
    fontWeight: '500',
    fontSize: 22,
  },
  subtitleStyle: {
    marginVertical: 3,
    opacity: 0.5,
  },
});

export default ProfileCard;
