import React, { Suspense, lazy } from 'react';
import { RefreshControl } from 'react-native';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

import Loader from '../../components/Loader';
import FallbackScreen from '../../components/FallbackScreen';

import type { LoggedInProps } from '../../types/Navigation';

import { Collection } from '../../enums/Collection';
import { Route } from '../../enums/Route';

const Container = lazy(() => import('../../components/Container'));
const Button = lazy(() => import('../../components/Button'));

const Categories = ({ navigation }: LoggedInProps<Route.CATEGORIES>) => {
  const uid = useSelector((state) => state.firebase.auth.uid);

  useFirestoreConnect([
    {
      collection: Collection.Categories,
      where: ['user', '==', uid],
    },
  ]);

  const categories = useSelector((state) => state.firestore.ordered.categories);

  return categories ? (
    // TODO hoc
    <Suspense fallback={<Loader />}>
      <Container
        scrollEnabled
        refreshControl={<RefreshControl refreshing={false} onRefresh={null} />}
      >
        {categories.length > 0 ? (
          <>
            {categories.map(({ id, name, ...data }) => (
              <Button
                title={name}
                onPress={() =>
                  navigation.navigate(Route.CATEGORY, { id, name, ...data })
                }
                key={id}
              />
            ))}
          </>
        ) : (
          // TODO: update title & message
          <FallbackScreen
            title="Categories not found"
            message="Create new category"
          />
        )}
      </Container>
    </Suspense>
  ) : (
    <Loader />
  );
};

export default Categories;
