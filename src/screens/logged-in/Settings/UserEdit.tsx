import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';

import Container from '../../../components/Container';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Loader from '../../../components/Loader';

type FormData = {
  name: string;
  surname: string;
  currentPassword: string;
  newPassword: string;
  confirm: string;
};

const UserEdit = () => {
  const [error, setError] = useState<string | null>(null);

  const { register, setValue, getValues } = useForm<FormData>({
    defaultValues: {
      // name: data?.name ?? '',
      // surname: data?.surname ?? '',
    },
  });

  // useEffect(() => {
  //   register('name', { required: true });
  //   register('surname', { required: true });
  //   register('currentPassword', { required: true });
  //   register('newPassword', { required: true });
  //   register('confirm', { required: true });
  // }, [register]);

  const remove = async () => {
    // await deleteUser(getCurrentUser()?.uid);

    // TODO not working

    Alert.alert(`User and Data has been removed`, undefined, [
      {
        text: 'OK',
        onPress: () => {
          // onSignOut();
          // setIsAuth(false);
        },
      },
    ]);
  };

  const removeAccount = () => {
    Alert.alert(
      'Do you want to remove an account',
      'All your data and statistics will be removed',
      [
        {
          text: 'Remove',
          style: 'destructive',
          onPress: remove,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <Container>
      <Input
        onChangeText={(text) => setValue('name', text)}
        defaultValue={getValues().name}
        label="Name"
        placeholder="e.g: Winston"
        flat
      />

      <Input
        onChangeText={(text) => setValue('surname', text)}
        defaultValue={getValues().surname}
        label="Surname"
        placeholder="e.g: Smith"
        flat
      />

      {/* TODO edit personal data */}
      {/* TODO change password (update) */}

      <Input
        onChangeText={(text) => setValue('currentPassword', text)}
        defaultValue={getValues().currentPassword}
        label="Current Password"
        placeholder="Current Password"
        flat
      />

      <Input
        onChangeText={(text) => setValue('newPassword', text)}
        defaultValue={getValues().newPassword}
        label="New Password"
        placeholder="New Password"
        flat
      />

      <Input
        onChangeText={(text) => setValue('confirm', text)}
        defaultValue={getValues().confirm}
        label="Confirm New Password"
        placeholder="Confirm New Password"
        flat
      />

      <Button
        title="Remove Account"
        onPress={removeAccount}
        type="clear"
        titleStyle={{ color: '#f22828' }}
      />
    </Container>
  );
};

export default UserEdit;
