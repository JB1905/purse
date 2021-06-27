import React, { useState, useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import { useFirestore } from 'react-redux-firebase';
import { Controller, useForm } from 'react-hook-form';
import { Box, Stack } from '@mobily/stacks';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Container from '../../components/Container';
import HeaderButton from '../../components/HeaderButton';
import SegmentedControl from '../../components/SegmentedControl';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import SectionBox from '../../components/SectionBox';
import ColorPicker from '../../components/ColorPicker';
import IconPicker from '../../components/IconPicker';

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
    formState: { errors, isDirty, isValid, isSubmitted },
    reset,
    watch,
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
          ...data, // user: getCurrentUser()?.uid // TODO
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

    // TODO
    // if (id) {
    //   updateCategory()
    // }else {
    //   createCategory()
    // }

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
    // TODO remove timeout workaround for iPad
    setTimeout(() => {
      navigation.setOptions({
        headerTitle: `${id ? 'Edit' : 'Create'} Category`,
        headerLeft: () => (
          <HeaderButton
            title="Cancel"
            iconName="close"
            onPress={navigation.goBack}
            // TODO onPress display confirmation when is dirty
            spaces
          />
        ),
        headerRight: () => (
          <HeaderButton
            title="Save"
            iconName="save"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid && isSubmitted}
            spaces
          />
        ),
        // TODO onBack/onGesture display confirmation when is dirty
        gestureEnabled: !isDirty,
      });
    }, 100);
  }, [navigation, isDirty, isValid, isSubmitted]);

  return (
    <Container keyboard scrollEnabled>
      <Box paddingY={8}>
        <Stack space={6}>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Category name"
                placeholder="Category name e.g: Food"
                onChangeText={onChange}
                defaultValue={value}
                errorMessage={errors.name}
                flat
              />
            )}
          />

          <Stack space={2}>
            {/* TODO highlight not valid value (color or icon) - red text */}
            <SegmentedControl
              // TODO move values to consts
              values={['Colour', 'Glyph']}
              selectedIndex={tab}
              onChange={(e) => setTab(e.nativeEvent.selectedSegmentIndex)}
            />

            <SectionBox>
              {/* TODO fix selected value after tab change */}
              {tab === Tabs.Colour ? (
                <Controller
                  name="color"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <ColorPicker
                      onSelect={onChange}
                      selectedColor={value}
                      colors={categoryColors}
                    />
                  )}
                />
              ) : (
                <Controller
                  name="icon"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <IconPicker
                      onSelect={onChange}
                      selectedIcon={value}
                      icons={categoryIcons}
                      color={watch().color}
                    />
                  )}
                />
              )}
            </SectionBox>
          </Stack>
        </Stack>
      </Box>

      {loading && <Loader />}
    </Container>
  );
};

export default CategoryManager;
