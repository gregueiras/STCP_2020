import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { defaultColor } from "../../../constants";

interface ButtonProps {
  text: string;
  onPress: () => void;
}

const Button = ({ text, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: defaultColor,
    borderRadius: 5,
    width: 123,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
  },
});
