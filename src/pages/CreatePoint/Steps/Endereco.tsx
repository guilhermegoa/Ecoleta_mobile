import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import MapView, { Marker, LatLng } from "react-native-maps";
import * as Location from "expo-location";

import apiIBGE from "../../../services/apiIBGE";
import PickerSelect from "../../../components/PickerSelect/index";
import styles from "../styles";

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface OptionsPicker {
  label: string;
  value: string;
}

interface latLng {
  latitude: number;
  longitude: number;
}

interface Props {
  selectedUf: string;
  setSelectedUf(data: string): void;
  selectedCity: string;
  setSelectedCity(data: string): void;
  latLng: latLng;
  setLatLng(data: LatLng): void;
}

const Endereco: React.FC<Props> = ({
  selectedUf,
  setSelectedUf,
  selectedCity,
  setSelectedCity,
  latLng,
  setLatLng,
}) => {
  const [ufs, setUfs] = useState<OptionsPicker[]>([]);
  const [cities, setCities] = useState<OptionsPicker[]>([]);
  const [intialPosisition, setInitialPosition] = useState<latLng>({
    latitude: 0,
    longitude: 0,
  });

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

      setInitialPosition({ latitude, longitude });
    }

    loadPosition();
  }, []);

  useEffect(() => {
    apiIBGE.get<IBGEUFResponse[]>("localidades/estados").then((response) => {
      const ufInitials = response.data.map((uf) => ({
        label: uf.sigla,
        value: uf.sigla,
      }));
      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    apiIBGE
      .get<IBGECityResponse[]>(`localidades/estados/${selectedUf}/municipios`)
      .then((response) => {
        const cityNames = response.data.map((city) => ({
          label: city.nome,
          value: city.nome,
        }));

        setCities(cityNames);
      });
  }, [selectedUf]);

  const handleSetLatLng = (event: latLng) => {
    const { latitude, longitude } = event;

    setLatLng({ latitude: latitude, longitude: longitude });
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.fomrSubTitle}>Endereço</Text>
      </View>
      <PickerSelect
        setSelected={setSelectedUf}
        items={ufs}
        selected={selectedUf}
        placeholder="Selecione um Estado."
      />
      <PickerSelect
        setSelected={setSelectedCity}
        items={cities}
        selected={selectedCity}
        placeholder="Selecione um Cidade."
      />

      {intialPosisition.latitude !== 0 && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: intialPosisition.latitude,
              longitude: intialPosisition.longitude,
              latitudeDelta: 0.018,
              longitudeDelta: 0.018,
            }}
            onPress={(event) => handleSetLatLng(event.nativeEvent.coordinate)}
          >
            <Marker
              style={{
                backgroundColor: "red",
                padding: 10,
                width: 90,
                height: 80,
              }}
              coordinate={{
                latitude: latLng.latitude,
                longitude: latLng.longitude,
              }}
            />
          </MapView>
        </View>
      )}
    </ScrollView>
  );
};

export default Endereco;
