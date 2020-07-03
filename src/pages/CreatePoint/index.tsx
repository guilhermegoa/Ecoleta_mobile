import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { RectButton } from "react-native-gesture-handler";

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

const CreatePoint = () => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [step, setStep] = useState<number>(0);

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
          />
        );
      case 1:
        return <Endereco />;
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
          <RectButton style={styles.button} onPress={prevStep}>
            <Text style={styles.buttomText}>Voltar</Text>
          </RectButton>
        </View>
        <View>
          <RectButton style={styles.button} onPress={nextStep}>
            <Text style={styles.buttomText}>Continuar</Text>
          </RectButton>
        </View>
      </View>
    </>
  );
};

export default CreatePoint;
