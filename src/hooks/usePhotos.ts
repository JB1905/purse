import * as ImagePicker from 'expo-image-picker';
import { useEffect } from 'react';

export const usePhotos = () => {
  // const [
  //   cameraRollPermission,
  //   askCameraRollPermission,
  // ] = Permissions.usePermissions(Permissions.MEDIA_LIBRARY);

  // useEffect(() => {
  //   if (cameraRollPermission && !cameraRollPermission.granted) {
  //     askCameraRollPermission();
  //   }
  // }, [
  //   askCameraRollPermission,
  //   cameraRollPermission,
  //   cameraRollPermission?.granted,
  // ]);

  useEffect(() => {
    ImagePicker.requestMediaLibraryPermissionsAsync(); // TODO
  }, []);

  const handleCameraRoll = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.cancelled) {
      return result;
    }
  };

  return {
    cameraRollPermission: null,
    handleCameraRoll,
  };
};
