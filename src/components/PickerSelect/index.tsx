import React from "react";
import RNPickerSelect from "react-native-picker-select";

import colors from "../../utils/colors";

interface Props {
  setSelected(data: string): void;
  items: OptionsPicker[];
  selected: string;
  placeholder?: string;
}

interface OptionsPicker {
  label: string;
  value: string;
}

const PickerSelect: React.FC<Props> = ({
  setSelected,
  items,
  selected,
  placeholder,
}) => {
  return (
    <RNPickerSelect
      placeholder={{
        label: placeholder,
      }}
      onValueChange={(data) => setSelected(data)}
      items={items}
      value={selected}
      style={{
        inputAndroid: {
          color: colors.grey200,
        },
        viewContainer: {
          backgroundColor: colors.white,
          borderRadius: 8,
          marginBottom: 8,
          paddingLeft: 16,
        },
      }}
    />
  );
};

export default PickerSelect;
