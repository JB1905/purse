import { useTheme } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { ActionSheetIOS, findNodeHandle, Button } from 'react-native';

import { useCamera } from '../hooks/useCamera';
import { usePhotos } from '../hooks/usePhotos';

export const AttachImage = () => {
  const { colors } = useTheme();

  const ref = useRef<number>(null);

  const { handleCameraRoll } = usePhotos();
  const { handleCamera } = useCamera();

  const showImageSourcesList = useCallback(() => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Select image from camera roll', 'Take a photo', 'Cancel'],
        cancelButtonIndex: 2,
        tintColor: colors.primary,
        anchor: findNodeHandle(ref.current),
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

  return (
    <Button
      title="Add Image"
      onPress={showImageSourcesList}
      // ref={ref}
    />
  );
};
