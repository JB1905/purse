import { useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

export const useCamera = () => {
  // TODO replace expo-permissions
  // const [cameraPermission, askCameraPermission] = Permissions.usePermissions(
  //   Permissions.CAMERA
  // );

  // useEffect(() => {
  //   if (cameraPermission && !cameraPermission.granted) {
  //     askCameraPermission();
  //   }
  // }, [askCameraPermission, cameraPermission, cameraPermission?.granted]);

  useEffect(() => {
    ImagePicker.requestCameraPermissionsAsync(); // TODO
  }, []);

  const handleCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      return result;
    }
  };

  return { cameraPermission: null, handleCamera };
};
