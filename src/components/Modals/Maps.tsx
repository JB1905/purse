import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// TODO
const Maps = () => {
  return (
    <MapView style={StyleSheet.flatten([styles.map])}>
      {/* <Marker coordinate={coords} /> */}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Maps;
