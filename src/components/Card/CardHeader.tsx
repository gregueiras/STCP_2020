import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Stop } from "../../redux/stops/types";
import { getName } from "../../services/aux";

interface CardHeaderProps extends Stop {
  containerStyle: ViewStyle;
}

const CardHeader = ({
  containerStyle,
  code,
  provider,
  customName,
}: CardHeaderProps) => {
  return (
    <View style={containerStyle}>
      <Text style={styles.headerText}>
        {getName({ code, provider, customName })}
      </Text>
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
