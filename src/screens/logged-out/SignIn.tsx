import React, { useState, useEffect } from 'react';
import { Image } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Box, Stack } from '@mobily/stacks';

import Container from '../../components/Container';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

import { useAuth } from '../../hooks/useAuth';

import type { LoggedOutProps } from '../../types/Navigation';

import { Route } from '../../enums/Route';

type FormData = {
  email: string;
  password: string;
};

const SignIn = ({ navigation }: LoggedOutProps<Route.SIGN_IN>) => {
  const { colors } = useTheme();

  const { login } = useAuth();

  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const [securePassword, setSecurePassword] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
  } = useForm<FormData>();

  useEffect(() => {
    register('email', { required: true });
    register('password', { required: true });
  }, [register]);

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

    setLoading(true);

    try {
      if (error) setError(undefined);

      await login({ email, password });
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  return (
    <Container full spaces keyboard>
      <Box paddingX={4}>
        <Stack space={8}>
          <Stack space={2}>
            <View style={styles.brand}>
              <Image
                source={require('../../../assets/icon.png')}
                containerStyle={styles.logo}
              />

              <Text h1>Purse</Text>
            </View>

            <Text h3>Your personal finance assistant</Text>
          </Stack>

          <Stack>
            <Input
              onChangeText={(text) => setValue('email', text)}
              defaultValue={watch().email}
              placeholder="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              errorMessage={errors.email}
            />

            <Input
              onChangeText={(text) => setValue('password', text)}
              defaultValue={watch().password}
              placeholder="Password"
              secureTextEntry={securePassword}
              errorMessage={errors.password}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setSecurePassword(!securePassword)}
                >
                  <Icon
                    name={securePassword ? 'visibility' : 'visibility-off'}
                    containerStyle={{ opacity: 0.75 }}
                    color={colors.text}
                    size={26}
                  />
                </TouchableOpacity>
              }
            />

            {error?.message && <ErrorMessage message={error.message} />}

            <Button title="Sign In" onPress={handleSubmit(onSubmit)} />
          </Stack>

          <Stack>
            <Button
              title="Forgot Password?"
              onPress={() => navigation.navigate(Route.RESET_PASSWORD)}
              type="clear"
            />

            <Button
              title="Sign Up"
              onPress={() => navigation.navigate(Route.SIGN_UP)}
              type="clear"
            />
          </Stack>
        </Stack>
      </Box>

      {loading && <Loader />}
    </Container>
  );
};

const styles = StyleSheet.create({
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
  },
});

export default SignIn;
