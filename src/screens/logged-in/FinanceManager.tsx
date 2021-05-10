import React, { useLayoutEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Controller, useForm } from 'react-hook-form';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { Box, Stack } from '@mobily/stacks';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Container from '../../components/Container';
import HeaderButton from '../../components/HeaderButton';
import SectionBox from '../../components/SectionBox';
import Loader from '../../components/Loader';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FallbackScreen from '../../components/FallbackScreen';
import { AttachImage } from '../../components/AttachImage';
import { MapPreview } from '../../components/MapPreview';

import { useTypedSelector } from '../../hooks/useTypedSelector';

import type { MainProps } from '../../types/Navigation';

import { Collection } from '../../enums/Collection';
import { Route } from '../../enums/Route';

const schema = z.object({
  type: z.string().nonempty(),
  value: z.string().nonempty(),
  title: z.string().nonempty(),
  category: z.string().nonempty(),
  date: z.date(),
  coords: z.object({
    lat: z.number(),
    lon: z.number(),
  }),
  images: z.any(), // TODO
});

type FormData = z.infer<typeof schema>;

const FinanceManager = ({
  route,
  navigation,
}: MainProps<Route.FINANCE_MANAGER>) => {
  const firestore = useFirestore();

  const id = route.params?.id ?? '';

  const [error, setError] = useState<Error>(); // TODO
  const [loading, setLoading] = useState(false);

  useFirestoreConnect([Collection.Categories]);

  const categories = useTypedSelector(
    (state) => state.firestore.ordered.categories
  );

  const defaultValues = {
    type: route.params?.type ?? undefined,
    value: route.params?.value ?? '',
    title: route.params?.title ?? '',
    category: route.params?.category ?? '',
    date: route.params?.date ?? Date.now(),
    coords: route.params?.coords ?? {},
    images: [],
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: FormData) => {
    const createFinance = () => {
      if (error) setError(undefined);

      setLoading(true);

      try {
        firestore.collection(Collection.Data).add({
          ...data, // user: getCurrentUser()?.uid
        });

        Alert.alert(`Added data: ${data.title}`, undefined, [
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

    const updateFinance = () => {
      setLoading(true);

      try {
        firestore.collection(Collection.Data).doc(id).update(data);

        Alert.alert(`Updated ${data.title}`, undefined, [
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
      'Do you want to save this finance?',
      `${data.title} will be ${id ? 'updated' : 'added'}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: id ? 'Update' : 'Save',
          style: 'destructive',
          onPress: id ? updateFinance : createFinance,
        },
      ]
    );
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      navigation.setOptions({
        headerTitle: `${id ? 'Edit' : 'Create'} Finance`,
        headerLeft: () => (
          <HeaderButton
            title="Cancel"
            iconName="close"
            onPress={navigation.goBack}
            spaces
          />
        ),
        headerRight: () =>
          categories?.length > 0 && (
            <HeaderButton
              title="Save"
              iconName="save"
              onPress={handleSubmit(onSubmit)}
              spaces
            />
          ),
        // TODO
        gestureEnabled: !isDirty,
      });
    }, 100);
  }, [navigation, categories, isDirty]);

  return (
    <Container keyboard scrollEnabled>
      <Box paddingY={8}>
        {/* TODO */}
        {/* <Stack space={8}> */}
        {categories ? (
          categories.length > 0 ? (
            <Stack space={6}>
              <Controller
                name="value"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={onChange}
                    defaultValue={value}
                    label="Amount"
                    placeholder="Amount"
                    keyboardType="number-pad"
                    errorMessage={errors.value}
                    flat
                  />
                )}
              />

              <Controller
                name="title"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChangeText={onChange}
                    defaultValue={value}
                    label="Title"
                    placeholder="Title"
                    // TODO errors[name]?
                    errorMessage={errors.title}
                    flat
                  />
                )}
              />

              <SectionBox title="Category">
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Picker
                      selectedValue={value}
                      onValueChange={onChange}
                      // enabled={!id} // TODO
                      // style={{
                      //   maxWidth: 440,
                      //   width: '100%',
                      //   alignSelf: 'center',
                      // }}
                    >
                      <Picker.Item label="" value="" />

                      {categories.map((category) => (
                        <Picker.Item
                          label={category.name}
                          value={category.id}
                          key={category.id}
                        />
                      ))}
                    </Picker>
                  )}
                />
              </SectionBox>

              <SectionBox title="Place">
                <MapPreview
                // onPress={() => setOpenModal('map')}
                // coordinate={coords}
                />
              </SectionBox>

              <Box paddingX={4}>
                <AttachImage />
              </Box>

              {/* <Gallery /> */}
            </Stack>
          ) : (
            <FallbackScreen
              title="No any categories"
              message="Before add expense create new category"
            >
              <Button
                title="Add it here"
                // onPress={() => navigation.navigate(Route.CATEGORY_MANAGER)} // TODO
                type="clear"
              />
            </FallbackScreen>
          )
        ) : (
          <Loader />
        )}
        {/* </Stack> */}
      </Box>

      {loading && <Loader />}
    </Container>
  );
};

export default FinanceManager;
