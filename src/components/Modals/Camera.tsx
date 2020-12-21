import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera as BaseCamera } from 'expo-camera';

// TODO
const Camera = () => {
  return (
    <View style={{ flex: 1 }}>
      <BaseCamera style={{ flex: 1 }}>
        <View style={{}}></View>
      </BaseCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  x: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
});

export default Camera;
