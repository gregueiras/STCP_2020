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
import NewStop from "../../pages/NewStop";

const Settings = () => {
  const navigation = useNavigation();
  const { stops } = useSelector((state: RootState) => state);
  const [openNewStop, setOpenNewStop] = useState(false);

  return (
    <View style={styles.page}>
      <Header />
      <View style={styles.container}>
        <Title text={"Paragens Favorita"} />
        <View style={styles.content}>
          <FlatList
            style={styles.list}
            data={stops}
            renderItem={({ item }) => <ListItem stop={item} />}
            keyExtractor={({ code, provider }) => `${code}_${provider}`}
          />
          <View style={styles.button}>
            <Button text="Nova Paragem" onPress={() => setOpenNewStop(true)} />
          </View>
        </View>
      </View>
      <NewStop open={openNewStop} setOpen={setOpenNewStop} />
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

  list: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
  },
  button: {
    marginLeft: "auto",
    marginTop: "auto",
    marginRight: 20,
    marginBottom: 20,
  },
});
