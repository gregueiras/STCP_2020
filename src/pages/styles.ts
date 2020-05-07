import { StyleSheet, Dimensions, Button, ViewStyle } from "react-native";

const margin = 0.03;

const buttonStyle: ViewStyle = {
  position: "absolute",
  top: Dimensions.get("screen").height * margin,
  zIndex: 5,
};

export default StyleSheet.create({
  buttonRight: {
    ...buttonStyle,
    right: Dimensions.get("screen").width * margin,
  },
  buttonLeft: {
    ...buttonStyle,
    left: Dimensions.get("screen").width * margin,
  },
});
