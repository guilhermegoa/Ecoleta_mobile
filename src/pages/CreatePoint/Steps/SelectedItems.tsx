import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SvgUri } from "react-native-svg";

import api from "../../../services/api";
import styles from "../styles";

interface Item {
  id: number;
  name: string;
  image_url: string;
}

interface Prop {
  selectedItems: number[];
  setSelectedItems(number: number[]): void;
}

const SelectedItems: React.FC<Prop> = ({ selectedItems, setSelectedItems }) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
    });
  }, []);

  const handleSelectedItem = (id: number) => {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <View style={styles.itemsContainer}>
      {items.map((item) => (
        <TouchableOpacity
          key={String(item.id)}
          activeOpacity={0.6}
          style={[
            styles.item,
            selectedItems.includes(item.id) && styles.selectedItem,
          ]}
          onPress={() => handleSelectedItem(item.id)}
        >
          <SvgUri width={42} height={42} uri={item.image_url} />
          <Text style={styles.itemTitle}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SelectedItems;
