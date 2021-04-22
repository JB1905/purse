import React, { useLayoutEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import MapView from 'react-native-maps';
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

import { useTypedSelector } from '../../hooks/useTypedSelector';

import type { MainProps } from '../../types/Navigation';

import { Collection } from '../../enums/Collection';
import { Route } from '../../enums/Route';
import { AttachImage } from '../../components/AttachImage';

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
  images: z.any(),
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

  const { handleSubmit, control, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: route.params?.type ?? undefined,
      value: route.params?.value ?? '',
      title: route.params?.title ?? '',
      category: route.params?.category ?? '',
      date: route.params?.date ?? Date.now(),
      coords: route.params?.coords ?? {},
      images: [],
    },
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
    });
  }, [navigation, categories]);

  return (
    <Container keyboard scrollEnabled>
      <Box paddingY={8}>
        <Stack space={8}>
          {categories ? (
            categories.length > 0 ? (
              <>
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
                      flat
                    />
                  )}
                />

                <SectionBox title="Category">
                  {/* <Picker
                  selectedValue={watch().category}
                  onValueChange={(value) => setValue('category', value)}
                  style={{
                    maxWidth: 440,
                    width: '100%',
                    alignSelf: 'center',
                  }}
                >
                  <Picker.Item label="" value="" />

                  {categories.map((category) => (
                    <Picker.Item
                      label={category.name}
                      value={category.id}
                      key={category.id}
                    />
                  ))}
                </Picker> */}
                </SectionBox>

                <SectionBox title="Place">
                  {/* TODO MapPreview */}
                  <MapView
                    pitchEnabled={false}
                    rotateEnabled={false}
                    zoomEnabled={false}
                    scrollEnabled={false}
                    // onPress={() => setOpenModal('map')}
                    style={{ width: '100%', height: 240 }}
                    cacheEnabled
                  >
                    {/* <Marker coordinate={coords} /> */}
                  </MapView>
                </SectionBox>

                <Box paddingX={4}>
                  <AttachImage />
                </Box>

                {/* <Gallery /> */}
              </>
            ) : (
              <FallbackScreen
                title="No any categories"
                message="Before add expense create new category"
              >
                <Button
                  title="Add it here"
                  // onPress={() => navigation.navigate(Route.CATEGORY_MANAGER)}
                  type="clear"
                />
              </FallbackScreen>
            )
          ) : (
            <Loader />
          )}
        </Stack>
      </Box>

      {loading && <Loader />}
    </Container>
  );
};

export default FinanceManager;
