import React, { useState } from 'react';
import { Image } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Box, Stack } from '@mobily/stacks';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

const schema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

type FormData = z.infer<typeof schema>;

const SignIn = ({ navigation }: LoggedOutProps<Route.SIGN_IN>) => {
  const { colors } = useTheme();

  const { login } = useAuth();

  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const [securePassword, setSecurePassword] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // TODO refactor
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
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={onChange}
                  defaultValue={value}
                  placeholder="E-mail"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  errorMessage={errors.email}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={onChange}
                  defaultValue={value}
                  placeholder="Password"
                  secureTextEntry={securePassword}
                  errorMessage={errors.password}
                  rightIcon={
                    // TODO refactor
                    <TouchableOpacity
                      onPress={() => setSecurePassword(!securePassword)}
                    >
                      <Icon
                        name={securePassword ? 'visibility' : 'visibility-off'}
                        containerStyle={styles.visibilityToggleButton}
                        color={colors.text}
                        size={26}
                      />
                    </TouchableOpacity>
                  }
                />
              )}
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
  visibilityToggleButton: {
    opacity: 0.75,
  },
});

export default SignIn;
