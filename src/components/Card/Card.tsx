import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { defaultColor } from "../../constants";
import CardHeader from "./CardHeader";
import CardContent from "./CardContent";
import { Stop } from "../../redux/stops/types";

interface CardProps extends Stop {
  message?: string;
}

const Card = ({ code, provider, customName, message }: CardProps) => {
  return (
    <View style={styles.container}>
      <CardHeader
        code={code}
        provider={provider}
        customName={customName}
        containerStyle={styles.header}
      />
      <CardContent containerStyle={styles.content} message={message} />
    </View>
  );
};

const headerSize = 20;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width * 0.75,
    marginRight: Dimensions.get("screen").width * 0.125,
    marginLeft: Dimensions.get("screen").width * 0.125,
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
