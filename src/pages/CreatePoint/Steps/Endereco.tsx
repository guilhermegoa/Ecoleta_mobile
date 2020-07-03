import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";

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

const Endereco = () => {
  const [ufs, setUfs] = useState<OptionsPicker[]>([]);
  const [selectedUf, setSelectedUf] = useState("");
  const [cities, setCities] = useState<OptionsPicker[]>([]);
  const [selectedCity, setSelectedCity] = useState("");

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

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -19.7755345,
            longitude: -43.8577598,
            latitudeDelta: 0.018,
            longitudeDelta: 0.018,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Endereco;
