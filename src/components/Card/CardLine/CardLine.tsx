import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Badge from "./Badge";
import Alarm from "./Alarm";

const CardLine = () => {
  return (
    <View style={styles.container}>
      <Badge line="500" />
      <View style={styles.lineDescription}>
        <Text style={styles.text}>Foz</Text>
        <Text style={styles.text}>5 mins</Text>
      </View>
      <Alarm active={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: "3%",
    marginLeft: "3%",
    alignItems: "center",
  },
  text: {
    fontFamily: "Montserrat",
  },
  lineDescription: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "3%",
    marginLeft: "3%",
    flexGrow: 1,
  },
});

export default CardLine;
