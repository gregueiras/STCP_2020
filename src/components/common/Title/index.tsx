import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  LayoutChangeEvent,
} from "react-native";
import { defaultColor } from "../../../constants";

interface TitleProps {
  text: string;
  lineSize: number;
}

const Title = ({ text, lineSize }: TitleProps) => {
  return (
    <View style={styles.titleContainer}>
      <View>
        <Text style={styles.title}>{text}</Text>
      </View>
      <View
        style={{
          ...styles.titleLine,
          width: lineSize,
          marginLeft: lineSize * 0.05,
        }}
      />
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: Dimensions.get("screen").width * 0.05,
    marginLeft: Dimensions.get("screen").width * 0.05,
  },
  titleLine: {
    borderBottomColor: defaultColor,
    height: 3,
    backgroundColor: defaultColor,
  },
  title: {
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
  },
});
