import { useTheme } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { ActionSheetIOS, findNodeHandle, Button } from 'react-native';

import { usePhotos } from '../hooks/usePhotos';
import { useCamera } from '../hooks/useCamera';

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
      (buttonIndex) => {
        if (buttonIndex === 0) {
          handleCameraRoll();
        } else if (buttonIndex === 1) {
          handleCamera();
        }
      }
    );
  }, []);

  return <Button title="Add Image" onPress={showImageSourcesList} ref={ref} />;
};
