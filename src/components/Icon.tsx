import React from 'react';
import { Icon as BaseIcon, IconProps } from 'react-native-elements';
import { Platform } from 'react-native';

import { systemIcons, categoryIcons } from '../constants/icons';

// TODO
const Icon = ({ type, name, ...props }: IconProps) => (
  <BaseIcon
    {...props}
    name={
      Object.assign(systemIcons, categoryIcons)[name][
        Platform.OS === 'ios' ? 'ios' : 'android'
      ]
    }
    type={type ?? Platform.OS === 'ios' ? 'ionicon' : 'material'}
  />
);

// const styles = StyleSheet.create({});

export default Icon;
