import React, { useState } from "react";
import { Text, View, TextInput, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RectButton } from "react-native-gesture-handler";

import styles from "../styles";

interface Props {
  nome: string;
  email: string;
  whatsapp: string;
  setNome(data: string): void;
  setEmail(data: string): void;
  setWhatsapp(data: string): void;
  setMarketImage(data: File): void;
}

const Dados: React.FC<Props> = ({
  nome,
  setNome,
  email,
  setEmail,
  whatsapp,
  setWhatsapp,
  setMarketImage,
}) => {
  const [imageUri, setImageUri] = useState<string>("");

  const handleChooseImage = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled) {
      return;
    }
    setMarketImage(pickerResult.uri);
    setImageUri(pickerResult.uri);
  };

  return (
    <>
      <View>
        <Text style={styles.fomrSubTitle}>Dados</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Nome da entidade"
          autoCorrect={false}
          onChangeText={setNome}
        >
          {nome}
        </TextInput>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
          onChangeText={setEmail}
        >
          {email}
        </TextInput>
        <TextInput
          style={styles.input}
          placeholder="Whatsapp"
          autoCorrect={false}
          onChangeText={setWhatsapp}
        >
          {whatsapp}
        </TextInput>
      </View>
      <Text style={styles.textSearchImage}>
        Escolha uma imagem para o estabelecimento.
      </Text>
      <RectButton onPress={handleChooseImage}>
        <View style={styles.containerMarketImage}>
          {imageUri === "" ? (
            <Image
              source={require("../../../assets/default-image.png")}
              style={styles.marketImage}
            />
          ) : (
            <Image source={{ uri: imageUri }} style={styles.marketImage} />
          )}
        </View>
      </RectButton>
    </>
  );
};

export default Dados;
