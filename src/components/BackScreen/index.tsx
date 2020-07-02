import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import colors from "../../utils/colors";

const BackScreen = () => {
  const navigation = useNavigation();

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleNavigateBack}>
      <Icon name="arrow-left" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
};

export default BackScreen;
