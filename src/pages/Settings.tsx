import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { defaultColor } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import sharedStyles from "./styles";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.page}>
      <TouchableOpacity
        style={sharedStyles.buttonLeft}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="ios-arrow-back" size={32} color="black" />
      </TouchableOpacity>
      <Text>Hye</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: defaultColor,
  },
});
