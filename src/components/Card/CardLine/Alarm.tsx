import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface AlarmProps {
  active: boolean;
}

const Alarm = ({ active }: AlarmProps) => {
  return (
    <MaterialCommunityIcons
      name={active ? "bell" : "bell-outline"}
      size={24}
      color="black"
    />
  );
};

export default Alarm;
