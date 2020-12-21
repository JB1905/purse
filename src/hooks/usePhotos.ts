import { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export const usePhotos = () => {
  const [
    cameraRollPermission,
    setCameraRollPermission,
  ] = useState<Permissions.PermissionStatus>(undefined);

  const [
    cameraRollPermissionError,
    setCameraRollPermissionError,
  ] = useState<string>(undefined);

  const requestRollCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

    if (status !== 'granted') {
      setCameraRollPermissionError('Wymagane pozwolenie na dostęp do aparatu');
    }

    setCameraRollPermission(status);
  };

  const getImageFromCameraRoll = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.cancelled) {
      return result;
    }
  };

  useEffect(() => {
    requestRollCameraPermission();
  }, []);

  return {
    cameraRollPermission,
    cameraRollPermissionError,
    getImageFromCameraRoll,
  };
};
