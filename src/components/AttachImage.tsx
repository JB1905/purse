import { useTheme } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { ActionSheetIOS, findNodeHandle, Button } from 'react-native';

import { usePhotos } from '../hooks/usePhotos';
import { useCamera } from '../hooks/useCamera';

// TODO? move to enums
enum AttachImageMenuItem {
  CameraRoll,
  Camera,
}

export const AttachImage = () => {
  const { colors } = useTheme();

  const ref = useRef(null);

  const { handleCameraRoll } = usePhotos();
  const { handleCamera } = useCamera();

  const showImageSourcesList = useCallback(() => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Select image from camera roll', 'Take a photo', 'Cancel'],
        cancelButtonIndex: 2,
        tintColor: colors.primary,
        anchor: findNodeHandle(ref.current) as number,
      },
      // TODO? extract function
      (buttonIndex) => {
        switch(buttonIndex) {
          case AttachImageMenuItem.CameraRoll:
            return handleCameraRoll();

          case AttachImageMenuItem.Camera:
            return handleCamera();

          default:
            break;
        }
      }
    );
  }, []);

  return <Button title="Add Image" onPress={showImageSourcesList} ref={ref} />;
};
