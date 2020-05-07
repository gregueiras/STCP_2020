import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { defaultColor } from "../../constants";
import CardHeader from "./CardHeader";
import CardContent from "./CardContent";

const Card = () => {
  return (
    <View style={styles.container}>
      <CardHeader containerStyle={styles.header} />
      <CardContent containerStyle={styles.content} />
    </View>
  );
};

const headerSize = 20;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    bottom: "5%",
    width: "75%",
    height: "40%",
  },
  header: {
    backgroundColor: defaultColor,
    height: `${headerSize + 0.1}%`,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    backgroundColor: "#FFFFFF",
    height: `${100 - headerSize}%`,
    width: "100%",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default Card;
