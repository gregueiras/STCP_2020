import React from "react";
import { View, ViewStyle } from "react-native";
import CardLine from "./CardLine";

interface CardContentProps {
  containerStyle: ViewStyle;
}

const CardContent = ({ containerStyle }: CardContentProps) => {
  return (
    <View style={containerStyle}>
      <CardLine />
    </View>
  );
};

export default CardContent;
