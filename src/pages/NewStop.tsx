import React, { SetStateAction, Dispatch } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import Title from "../components/common/Title";

interface NewStopProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewStop = ({ open, setOpen }: NewStopProps) => {
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
          <Title text="Nova Paragem" />
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
});
