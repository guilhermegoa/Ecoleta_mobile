import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import apiIBGE from "../../services/apiIBGE";
import styles from "./styles";

import RNPickerSelect from "react-native-picker-select";

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

const Home = () => {
  const [ufs, setUfs] = useState<OptionsPicker[]>([]);
  const [selectedUf, setSelectedUf] = useState("");
  const [cities, setCities] = useState<OptionsPicker[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [uf, setUf] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const navigation = useNavigation();

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

  const handleNavigateToMap = () => {
    navigation.navigate("Points", {
      uf,
      city,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ImageBackground
        source={require("../../assets/home-background.png")}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require("../../assets/logo.png")} />
          <View>
            <Text style={styles.title}>
              Seu marketplace de coleta de resíduos
            </Text>
            <Text style={styles.description}>
              Ajudamos pessoa a encontrar ponsto de coleta de forma eficiente.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RNPickerSelect
            placeholder={{
              label: "Selecione um Estado.",
            }}
            onValueChange={(data) => setSelectedUf(data)}
            items={ufs}
            value={selectedUf}
          />
          <RNPickerSelect
            placeholder={{
              label: "Selecione um Cidade.",
            }}
            onValueChange={(data) => setSelectedCity(data)}
            items={cities}
            value={selectedCity}
          />

          <RectButton style={styles.button} onPress={handleNavigateToMap}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;
