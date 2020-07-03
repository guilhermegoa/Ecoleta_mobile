import React, { Props } from "react";
import { Text, View, TextInput } from "react-native";
import styles from "../styles";

interface Props {
  nome: string;
  email: string;
  whatsapp: string;
  setNome(data: string): void;
  setEmail(data: string): void;
  setWhatsapp(data: string): void;
}

const Dados: React.FC<Props> = ({
  nome,
  setNome,
  email,
  setEmail,
  whatsapp,
  setWhatsapp,
}) => {
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
    </>
  );
};

export default Dados;
