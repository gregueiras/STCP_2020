import React, { SetStateAction, Dispatch, useState } from "react";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import Modal from "react-native-modal";
import Title from "../../../components/common/Title";
import Button from "../../../components/common/Button";
import { useDispatch } from "react-redux";
import { addStop } from "../../../redux/stops/actions";

interface NewStopProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewStop = ({ open, setOpen }: NewStopProps) => {
  const [provider, setProvider] = useState("");
  const [stop, setStop] = useState("");
  const dispatch = useDispatch();

  function reset() {
    setProvider("");
    setStop("");
    setOpen(false);
  }

  return (
    <Modal
      avoidKeyboard
      isVisible={open}
      onSwipeComplete={() => setOpen(false)}
      swipeDirection="down"
      coverScreen={false}
    >
      <View style={styles.container}>
        <View>
          <Title text="Nova Paragem" lineSize={130} />
        </View>
        <View style={styles.content}>
          <View>
            <Text style={styles.label}>Fornecedor</Text>
            <TextInput
              value={provider}
              onChangeText={setProvider}
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.label}>Paragem</Text>
            <TextInput
              value={stop}
              onChangeText={setStop}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Cancelar" onPress={() => reset()} variant="secondary" />
          <Button
            text="Confirmar"
            onPress={() => {
              dispatch(addStop({ code: stop, provider }));
              reset();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default NewStop;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    height: "50%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: Dimensions.get("screen").width * 0.05,
  },
  content: {
    flexGrow: 1,
    justifyContent: "space-evenly",
  },
  input: {
    borderColor: "#000000",
    borderWidth: 1.5,
    borderRadius: 5,
    marginHorizontal: 5,
    height: 40,
  },
  label: {
    marginHorizontal: 5,
    fontFamily: "Montserrat",
    marginBottom: 5,
  },
});
