import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";

import Header from "./Header";
import ListItem from "./ListItem";
import { defaultColor } from "../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Button from "../../components/common/Button";
import { useNavigation } from "@react-navigation/native";
import Title from "../../components/common/Title";
import NewStop from "./Modals/NewStop";
import EditStop from "./Modals/EditStop";
import { Stop } from "../../redux/stops/types";

const Settings = () => {
  const { stops } = useSelector((state: RootState) => state);
  const [openNewStop, setOpenNewStop] = useState(false);
  const [selectedStop, setSelectedStop] = useState<Stop | undefined>();

  return (
    <View style={styles.page}>
      <Header />
      <View style={styles.container}>
        <Title text={"Paragens Favoritas"} lineSize={165} />
        <View style={styles.content}>
          <FlatList
            style={styles.list}
            data={stops}
            renderItem={({ item }) => (
              <ListItem stop={item} setSelectedStop={setSelectedStop} />
            )}
            keyExtractor={({ code, provider }) => `${code}_${provider}`}
            ListEmptyComponent={() => (
              <Text style={styles.emptyMessage}>
                Acrescente algumas paragens!
              </Text>
            )}
          />
          <View style={styles.button}>
            <Button text="Nova Paragem" onPress={() => setOpenNewStop(true)} />
          </View>
        </View>
      </View>
      <NewStop open={openNewStop} setOpen={setOpenNewStop} />
      <EditStop selectedStop={selectedStop} setSelectedStop={setSelectedStop} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: "#E5E8F0",
  },
  container: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.75,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: Dimensions.get("window").height * 0.18,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  emptyMessage: {
    fontFamily: "Montserrat",
    fontSize: 16,
    color: "#555",
    alignSelf: "center",
    marginTop: Dimensions.get("window").width * 0.05,
  },
  list: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    marginTop: Dimensions.get("window").height * 0.02,
  },
  button: {
    marginLeft: "auto",
    marginTop: "auto",
    marginRight: 20,
    marginBottom: 20,
  },
});
