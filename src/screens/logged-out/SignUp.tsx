import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { Box, Stack } from '@mobily/stacks';

import Container from '../../components/Container';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

import { useAuth } from '../../hooks/useAuth';

import type { LoggedOutProps } from '../../types/Navigation';

import { Route } from '../../enums/Route';

type FormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirm: string;
};

const SignUp = ({ navigation }: LoggedOutProps<Route.SIGN_UP>) => {
  const { createAccount } = useAuth();

  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    errors,
  } = useForm<FormData>();

  useEffect(() => {
    register('name', { required: true });
    register('surname', { required: true });
    register('email', { required: true });

    register('password', {
      required: true,
      minLength: {
        value: 6,
        message: 'Password is too short (at least 6 char.)',
      },
    });

    register('confirm', {
      required: true,
      minLength: {
        value: 6,
        message: 'Password is too short (at least 6 char.)',
      },
    });
  }, [register]);

  const onSubmit = async (data: FormData) => {
    const { name, surname, email, password } = data;

    setLoading(true);

    try {
      if (error) setError(undefined);

      await createAccount({ email, password, name, surname });

      Alert.alert('User created succesfully', undefined, [
        {
          text: 'OK',
          onPress: navigation.goBack,
        },
      ]);
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
            <Text h2>Sign Up</Text>

            <Text h3>Save your money. Start today!</Text>
          </Stack>

          <Stack>
            <Input
              onChangeText={(text) => setValue('name', text)}
              defaultValue={getValues().name}
              placeholder="Name"
              errorMessage={errors.name}
            />

            <Input
              onChangeText={(text) => setValue('surname', text)}
              defaultValue={getValues().surname}
              placeholder="Surname"
              errorMessage={errors.surname}
            />

            <Input
              onChangeText={(text) => setValue('email', text)}
              defaultValue={getValues().email}
              placeholder="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              errorMessage={errors.email}
            />

            <Input
              onChangeText={(text) => setValue('password', text)}
              defaultValue={getValues().password}
              placeholder="Password"
              secureTextEntry
              errorMessage={errors.password}
            />

            <Input
              onChangeText={(text) => setValue('confirm', text)}
              defaultValue={getValues().confirm}
              placeholder="Confirm Password"
              secureTextEntry
              errorMessage={errors.confirm}
            />

            {error?.message && <ErrorMessage message={error.message} />}

            <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
          </Stack>
        </Stack>
      </Box>

      {loading && <Loader />}
    </Container>
  );
};

export default SignUp;
