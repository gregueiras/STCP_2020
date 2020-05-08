import React from "react";
import { Text, View, ViewStyle, StyleSheet } from "react-native";
import CardLine from "./CardLine";

interface CardContentProps {
  containerStyle: ViewStyle;
  message?: string;
}

const CardContent = ({ containerStyle, message }: CardContentProps) => {
  return (
    <View style={containerStyle}>
      {message ? (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
      ) : (
        <CardLine />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontFamily: "Montserrat",
    fontSize: 16,
    color: "#555",
  },
});

export default CardContent;
