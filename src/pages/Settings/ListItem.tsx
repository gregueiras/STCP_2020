import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Stop } from "../../redux/stops/types";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ListItemProps {
  stop: Stop;
}

const ListItem = ({ stop }: ListItemProps) => {
  const { code, provider, customName } = stop;

  return (
    <View style={styles.item}>
      <View>
        <Text>{customName ?? `${provider} - ${code}`}</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Ionicons
            name={`${Platform.OS === "ios" ? "ios" : "md"}-create`}
            size={24}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name={`${Platform.OS === "ios" ? "ios" : "md"}-trash`}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ListItem;
