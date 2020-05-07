import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { defaultColor } from "../../../constants";

interface TitleProps {
  text: string;
}

const Title = ({ text }: TitleProps) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{text}</Text>
      <View style={styles.titleLine} />
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: Dimensions.get("window").width * 0.05,
    marginLeft: Dimensions.get("window").width * 0.05,
  },
  titleLine: {
    borderBottomColor: defaultColor,
    height: 3,
    width: Dimensions.get("window").fontScale * 185,
    marginLeft: Dimensions.get("window").fontScale * 5,
    backgroundColor: defaultColor,
  },
  title: {
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
  },
});
