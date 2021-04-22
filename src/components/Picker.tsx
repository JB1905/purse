import React from 'react';
import { PickerItemProps, Platform, StyleSheet } from 'react-native';
import { Picker as BasePicker } from '@react-native-community/picker';
import { ItemValue } from '@react-native-community/picker/typings/Picker';

import { useElementsTheme } from '../hooks/useElementsTheme';

type RequiredPickerItemProps = Omit<PickerItemProps, 'value' | 'color'> & {
  readonly value: any;
  readonly color?: string;
};

interface Props<T> {
  readonly data: T[];
  readonly fallback?: RequiredPickerItemProps;
  readonly selectedValue?: ItemValue;
  readonly extraValue?: RequiredPickerItemProps;
  readonly isError: boolean;
  onValueChange: (itemValue: ItemValue, itemIndex: number) => void;
}

type PickerData = {
  readonly node: {
    readonly nazwa: string;
    readonly id: string;
  };
};

// TODO types
const Picker = <T extends PickerData>({
  data,
  fallback,
  selectedValue,
  extraValue,
  isError,
  onValueChange,
}: Props<T>) => {
  const { theme } = useElementsTheme();

  return (
    <BasePicker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
    >
      {fallback && (
        <BasePicker.Item
          {...fallback}
          color={isError ? theme.colors.error : undefined}
        />
      )}

      {data.map(({ node }) => (
        <BasePicker.Item label={node.nazwa} value={node.id} key={node.id} />
      ))}

      {extraValue && <BasePicker.Item {...extraValue} />}
    </BasePicker>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: Platform.select({
      ios: 210,
      android: 50,
    }),
  },
});

export default Picker;
