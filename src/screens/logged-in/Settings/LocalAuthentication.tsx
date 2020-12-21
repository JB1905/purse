import React from 'react';
import { Switch } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { Box } from '@mobily/stacks';

import Container from '../../../components/Container';

const LocalAuthentication = () => {
  const { colors } = useTheme();

  return (
    <Container>
      <Box paddingX={4} paddingY={8}>
        <ListItem
          containerStyle={{
            backgroundColor: colors.card,
            paddingVertical: 0,
            height: 50,
          }}
        >
          <ListItem.Content>
            <ListItem.Title style={{ color: colors.text }} numberOfLines={1}>
              Enable Login with Biometric Sensors
            </ListItem.Title>
          </ListItem.Content>

          <Switch
            // value={value} onValueChange={updateLocalAuthentication}
            />
        </ListItem>
      </Box>
    </Container>
  );
};

export default LocalAuthentication;
