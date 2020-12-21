import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mobily/stacks';

import Container from '../../../components/Container';
import Icon from '../../../components/Icon';

import { SET_THEME } from '../../../store/actions/themeActions';

const APPEARANCE_MODES = ['Automatic', 'Dark', 'Light']; // TODO

const Appearance = () => {
  const { colors } = useTheme();

  const appearance = useSelector((state) => state.theme.theme);

  const dispatch = useDispatch();

  return (
    <Container>
      <Box paddingX={4} paddingY={8}>
        {APPEARANCE_MODES.map((button, index) => (
          <ListItem
            key={button}
            onPress={() => dispatch({ type: SET_THEME, payload: button })}
            bottomDivider={index !== APPEARANCE_MODES.length}
            containerStyle={StyleSheet.flatten([
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
              styles.container,
            ])}
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: colors.text }}>
                {button}
              </ListItem.Title>
            </ListItem.Content>

            {button === appearance && (
              <Icon name="checkmark" color={colors.primary} size={30} />
            )}
          </ListItem>
        ))}
      </Box>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    height: 50,
  },
});

export default Appearance;
