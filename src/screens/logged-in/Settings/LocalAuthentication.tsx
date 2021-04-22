import React from 'react';
import { Box } from '@mobily/stacks';

import Container from '../../../components/Container';
import { ToggleListItem } from '../../../components/ToggleListItem';

const LocalAuthentication = () => {
  return (
    <Container>
      <Box paddingX={4} paddingY={8}>
        <ToggleListItem
          title="Enable Login with Biometric Sensors"
          // toggleState={value}
          // onToggleChange={updateLocalAuthentication}
        />
      </Box>
    </Container>
  );
};

export default LocalAuthentication;
