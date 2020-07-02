import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SvgUri } from "react-native-svg";
import api from "../../services/api";
import * as Location from "expo-location";

import BackScreen from "../../components/BackScreen/index";
import styles from "./styles";

interface Item {
  id: number;
  name: string;
  image_url: string;
}

interface Point {
  id: number;
  name: string;
  image: string;
  image_url: string;
  latitude: number;
  longitude: number;
  items: {
    title: string;
  }[];
}

interface Params {
  uf: string;
  city: string;
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [intialPosisition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Ooooops",
          "precisamos de sua permissão para obter a localização"
        );
        return;
      }

      const location = Location.getCurrentPositionAsync();

      const { latitude, longitude } = (await location).coords;

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get("points", {
        params: {
          city: routeParams.city || "Contagem",
          uf: routeParams.uf || "MG",
          items:
            selectedItems.length !== 0 ? selectedItems : [1, 2, 3, 4, 5, 6],
        },
      })
      .then((reponse) => {
        setPoints(reponse.data);
      });
  }, [selectedItems]);

  const handleNavigateToDetail = (id: number) => {
    navigation.navigate("Detail", { point_id: id });
  };

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
    <>
      <View style={styles.container}>
        <BackScreen />

        <Text style={styles.title}>Bem Vindo</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta
        </Text>

        <View style={styles.mapContainer}>
          {intialPosisition[0] !== 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={intialPosisition[0] === 0}
              initialRegion={{
                latitude: intialPosisition[0],
                longitude: intialPosisition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map((point) => (
                <Marker
                  key={String(point.id)}
                  style={styles.mapMarker}
                  onPress={() => handleNavigateToDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{
                        uri: point.image_url,
                      }}
                    />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map((item) => (
            <TouchableOpacity
              key={String(item.id)}
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : null,
              ]}
              onPress={() => handleSelectedItem(item.id)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Points;
