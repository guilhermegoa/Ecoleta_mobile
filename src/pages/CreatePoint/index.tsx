import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";
import styles from "./styles";
import BackScreen from "../../components/BackScreen/index";
import Dados from "./Steps/Dados";
import Endereco from "./Steps/Endereco";
import SelectedItems from "./Steps/SelectedItems";

interface Item {
  id: number;
  name: string;
  image_url: string;
}

interface latLng {
  latitude: number;
  longitude: number;
}

const CreatePoint = () => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [marketImage, setMarketImage] = useState<string>("");
  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [latLng, setLatLng] = useState<latLng>({
    latitude: 0,
    longitude: 0,
  });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [step, setStep] = useState<number>(0);

  const navigation = useNavigation();

  const steps = () => {
    switch (step) {
      case 0:
        return (
          <Dados
            nome={nome}
            setNome={setNome}
            email={email}
            setEmail={setEmail}
            whatsapp={whatsapp}
            setWhatsapp={setWhatsapp}
            setMarketImage={setMarketImage}
          />
        );
      case 1:
        return (
          <Endereco
            selectedUf={selectedUf}
            setSelectedUf={setSelectedUf}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            latLng={latLng}
            setLatLng={setLatLng}
          />
        );
      case 2:
        return (
          <SelectedItems
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        );
      default:
        break;
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    const uf = selectedUf;
    const city = selectedCity;
    const { latitude, longitude } = latLng;
    const items = selectedItems;

    const data = new FormData();

    data.append("name", nome);
    data.append("email", email);
    data.append("whatsapp", whatsapp);
    data.append("uf", uf);
    data.append("city", city);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("items", items.join(","));

    if (marketImage) {
      data.append("image", marketImage);
    }

    console.log(data);

    return;

    await api.post("points", data);

    alert("Ponto de coleta criado");

    navigation.goBack();
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <BackScreen />

          <View style={styles.form}>
            <Text style={styles.formTitle}>Cadastro do ponto de coleta</Text>

            {steps()}
          </View>
        </View>
      </ScrollView>
      <View style={styles.containerButton}>
        <View>
          {step > 0 ? (
            <RectButton style={styles.button} onPress={prevStep}>
              <Text style={styles.buttomText}>Voltar</Text>
            </RectButton>
          ) : (
            <RectButton style={styles.button}>
              <Text style={styles.buttonTextInvisible}>Voltar</Text>
            </RectButton>
          )}
        </View>
        <View>
          {step === 2 ? (
            <RectButton style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttomText}>Cadastrar</Text>
            </RectButton>
          ) : (
            <RectButton style={styles.button} onPress={nextStep}>
              <Text style={styles.buttomText}>Continuar</Text>
            </RectButton>
          )}
        </View>
      </View>
    </>
  );
};

export default CreatePoint;
