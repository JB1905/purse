import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { MapViewProps } from 'react-native-maps';

// TODO
export const MapPreview = (props: MapViewProps) => (
  <MapView
    {...props}
    pitchEnabled={false}
    rotateEnabled={false}
    zoomEnabled={false}
    scrollEnabled={false}
    // onPress={() => setOpenModal('map')}
    style={styles.preview}
    cacheEnabled
  >
    {/* <Marker coordinate={coords} /> */}
  </MapView>
);

const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: 240,
  },
});
