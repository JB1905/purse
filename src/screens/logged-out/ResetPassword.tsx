import React, { useState } from 'react';
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
  email: z.string().email().nonempty(),
});

type FormData = z.infer<typeof schema>;

const ResetPassword = ({
  navigation,
}: LoggedOutProps<Route.RESET_PASSWORD>) => {
  const { resetPassword } = useAuth();

  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const { email } = data;

    setLoading(true);

    try {
      if (error) setError(undefined);

      await resetPassword(email);

      Alert.alert(`Message sent to: ${email}`, undefined, [
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
            <Text h2>Reset Password</Text>

            <Text h3>Have you forgotten your password?</Text>
          </Stack>

          <Stack>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={onChange}
                  defaultValue={value}
                  placeholder="Your account email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  errorMessage={errors.email}
                />
              )}
            />

            {error?.message && <ErrorMessage message={error.message} />}

            <Button
              title="Send Reset Message"
              onPress={handleSubmit(onSubmit)}
            />
          </Stack>
        </Stack>
      </Box>

      {loading && <Loader />}
    </Container>
  );
};

export default ResetPassword;
