import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Alert } from 'react-native';
import { useFirestore } from 'react-redux-firebase';
import { Controller, useForm } from 'react-hook-form';
import { Stack, Box } from '@mobily/stacks';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Container from '../../components/Container';
import HeaderButton from '../../components/HeaderButton';
import SegmentedControl from '../../components/SegmentedControl';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import SectionBox from '../../components/SectionBox';
import IconPicker from '../../components/IconPicker';
import ColorPicker from '../../components/IconPicker';

import { colors as categoryColors } from '../../constants/colors';
import { categoryIcons } from '../../constants/icons';

import type { MainProps } from '../../types/Navigation';

import { Collection } from '../../enums/Collection';
import { Route } from '../../enums/Route';

const schema = z.object({
  name: z.string().nonempty(),
  color: z.string().nonempty(),
  icon: z.string().nonempty(),
});

type FormData = z.infer<typeof schema>;

enum Tabs {
  Colour,
  Glyph,
}

const CategoryManager = ({
  route,
  navigation,
}: MainProps<Route.CATEGORY_MANAGER>) => {
  const firestore = useFirestore();

  const [tab, setTab] = useState(0);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const id = route?.params?.id ?? '';

  const defaultValues = {
    name: route?.params?.name ?? '',
    color: route?.params?.color ?? '',
    icon: route?.params?.icon ?? '',
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: FormData) => {
    if (error) setError(''); // TODO

    const createCategory = async () => {
      try {
        setLoading(true);

        firestore.collection(Collection.Categories).add({
          ...data, // user: getCurrentUser()?.uid
        });

        Alert.alert(`Added category: ${data.name}`, undefined, [
          {
            text: 'Done',
            style: 'cancel',
            onPress: navigation.goBack,
          },
          {
            text: 'Add more',
            onPress: () => reset(),
          },
        ]);
      } catch (err) {
        setError(err);
      }

      setLoading(false);
    };

    const updateCategory = async () => {
      try {
        setLoading(true);

        firestore.collection(Collection.Categories).doc(id).update(data);

        Alert.alert(`Updated category ${data.name}`, undefined, [
          {
            text: 'Done',
            onPress: navigation.goBack,
          },
        ]);
      } catch (err) {
        setError(err);
      }

      setLoading(false);
    };

    Alert.alert(
      'Do you want to save this category?',
      `Category ${data.name} will be ${id ? 'updated' : 'added'}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: id ? 'Update' : 'Save',
          style: 'destructive',
          onPress: id ? updateCategory : createCategory,
        },
      ]
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${id ? 'Edit' : 'Create'} Category`,
      headerLeft: () => (
        <HeaderButton
          title="Cancel"
          iconName="close"
          onPress={navigation.goBack}
          spaces
        />
      ),
      headerRight: () => (
        <HeaderButton
          title="Save"
          iconName="save"
          onPress={handleSubmit(onSubmit)}
          spaces
        />
      ),
    });
  }, [navigation]);

  return (
    <Container keyboard scrollEnabled>
      <Box paddingY={8}>
        {/* <Stack space={8}> */}

        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              onChangeText={onChange}
              defaultValue={value}
              label="Category name"
              placeholder="Category name e.g: Food"
              errorMessage={errors.name}
              flat
            />
          )}
        />

        <SegmentedControl
          values={['Colour', 'Glyph']}
          // values={Object.keys(Tabs)}
          selectedIndex={tab}
          onChange={(e) => setTab(e.nativeEvent.selectedSegmentIndex)}
        />

        <SectionBox>
          {/* TODO */}
          {/* {tab === Tabs.Colour ? (
            <ColorPicker
              onSelect={(color) => setValue('color', color)}
              selectedColor={watch().color}
              colors={categoryColors}
            />
          ) : (
            <IconPicker
              onSelect={(icon) => setValue('icon', icon)}
              selectedIcon={watch().icon}
              icons={categoryIcons}
            />
          )} */}
        </SectionBox>
        {/* </Stack> */}
      </Box>

      {loading && <Loader />}
    </Container>
  );
};

export default CategoryManager;
