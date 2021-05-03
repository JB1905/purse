import React from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mobily/stacks';

import Container from '../../../components/Container';

import { SET_THEME } from '../../../store/actions/themeActions';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { RadioListItem } from '../../../components/RadioListItem';

const APPEARANCE_MODES = ['Automatic', 'Dark', 'Light']; // TODO

const Appearance = () => {
  const activeAppearance = useTypedSelector((state) => state.theme.theme);

  const dispatch = useDispatch();

  return (
    <Container>
      <Box paddingX={4} paddingY={8}>
        {APPEARANCE_MODES.map((appearanceMode, index) => (
          <RadioListItem
            key={appearanceMode}
            title={appearanceMode}
            onPress={() =>
              dispatch({ type: SET_THEME, payload: appearanceMode })
            }
            bottomDivider={index !== APPEARANCE_MODES.length}
            checked={appearanceMode === activeAppearance}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Appearance;
