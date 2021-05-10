import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { Box, Stack } from '@mobily/stacks';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Container from '../../components/Container';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';

import { useAuth } from '../../hooks/useAuth';

import type { LoggedOutProps } from '../../types/Navigation';

import { Route } from '../../enums/Route';

const schema = z.object({
  name: z.string().nonempty(),
  surname: z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
  confirm: z.string().nonempty(),
});

type FormData = z.infer<typeof schema>;

const SignUp = ({ navigation }: LoggedOutProps<Route.SIGN_UP>) => {
  const { createAccount } = useAuth();

  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // TODO refactor
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

  // TODO
  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: !isDirty,
    });
  }, [navigation, isDirty]);

  return (
    <Container full spaces keyboard>
      <Box paddingX={4}>
        <Stack space={8}>
          <Stack space={2}>
            <Text h2>Sign Up</Text>
            <Text h3>Save your money. Start today!</Text>
          </Stack>

          <Stack>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={onChange}
                  defaultValue={value}
                  placeholder="Name"
                  errorMessage={errors.name}
                />
              )}
            />

            <Controller
              name="surname"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={onChange}
                  defaultValue={value}
                  placeholder="Surname"
                  errorMessage={errors.surname}
                />
              )}
            />

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
                  secureTextEntry
                  errorMessage={errors.password}
                />
              )}
            />

            <Controller
              name="confirm"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={onChange}
                  defaultValue={value}
                  placeholder="Confirm Password"
                  secureTextEntry
                  errorMessage={errors.confirm}
                />
              )}
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
