import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Stop } from "../../redux/stops/types";

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
        {customName ?? `${provider} - ${code}`}
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
