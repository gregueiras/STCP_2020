import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface CardHeaderProps {
  containerStyle: ViewStyle;
}

const CardHeader = ({ containerStyle }: CardHeaderProps) => {
  return (
    <View style={containerStyle}>
      <Text style={styles.headerText}>STCP - BVLH1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: "#FFFFFF",
    fontFamily: "Montserrat-Medium",
    fontSize: 18,
  },
});

export default CardHeader;
