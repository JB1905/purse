import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { Box, Stack } from '@mobily/stacks';

import Container from '../../components/Container';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import StatusBar from '../../components/StatusBar';
// import ErrorMessage from '../../components/ErrorMessage';

import { useAuth } from '../../hooks/useAuth';

import type { LoggedOutProps } from '../../types/Navigation';

import { Route } from '../../enums/Route';

type FormData = {
  email: string;
};

const ResetPassword = ({
  navigation,
}: LoggedOutProps<Route.RESET_PASSWORD>) => {
  const { resetPassword } = useAuth();

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
    register('email', { required: true });
  }, [register]);

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
      <StatusBar isModal />

      <Box paddingX={4}>
        <Stack space={8}>
          <Stack space={2}>
            <Text h2>Reset Password</Text>

            <Text h3>Have you forgotten your password?</Text>
          </Stack>

          <Stack>
            <Input
              onChangeText={(text) => setValue('email', text)}
              defaultValue={getValues().email}
              placeholder="Your account email"
              autoCapitalize="none"
              keyboardType="email-address"
              errorMessage={errors.email}
            />

            {/* {error?.message && <ErrorMessage message={error.message} />} */}

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
