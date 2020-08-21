import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import Button from '../../components/common/Button';
import Title from '../../components/common/Title';
import { Stop } from '../../redux/stops/types';
import { RootState } from '../../redux/store';
import Header from './Header';
import ListItem from './ListItem';
import EditStop from './Modals/EditStop';
import NewStop from './Modals/NewStop';
import ProvidersList from './Modals/ProvidersList';

const Settings = () => {
  const { stops } = useSelector((state: RootState) => state);
  const [openNewStop, setOpenNewStop] = useState(false);
  const [openProviders, setOpenProviders] = useState(false);
  const [selectedStop, setSelectedStop] = useState<Stop | undefined>();
  const [locationPermission, setLocationPermission] = useState<boolean | undefined>();

  useEffect(() => {
    async function getPermission() {
      const { status } = await Permissions.getAsync(Permissions.LOCATION);
      setLocationPermission(status === 'granted');
    }

    getPermission();
  }, []);

  const askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    setLocationPermission(status === 'granted');
  };

  return (
    <View style={styles.page}>
      <Header />
      <View style={styles.container}>
        <Title text="Paragens Favoritas" lineSize={165} />
        <View style={styles.content}>
          <FlatList
            style={styles.list}
            data={stops}
            renderItem={({ item }) => <ListItem stop={item} setSelectedStop={setSelectedStop} />}
            keyExtractor={({ code, provider }) => `${code}_${provider}`}
            ListEmptyComponent={() => (
              <Text style={{ ...styles.text, ...styles.emptyMessage }}>Acrescente algumas paragens!</Text>
            )}
          />
          
          <View style={styles.buttonGroup}>
          <View style={styles.button}>
            <Button text="Provedores" onPress={() => setOpenProviders(true)} />
          </View>
          <View style={styles.button}>
            <Button text="Nova Paragem" onPress={() => setOpenNewStop(true)} />
          </View>
          </View>
        </View>
        {locationPermission !== undefined && (
          <View style={styles.perm}>
            <Text style={styles.text}>Permissão de Localização</Text>
            {locationPermission ? (
              <Ionicons name="ios-checkmark" size={34} color="black" />
            ) : (
              <Ionicons onPress={() => askPermission()} name="ios-close" size={34} color="black" />
            )}
          </View>
        )}
      </View>
      <NewStop open={openNewStop} setOpen={setOpenNewStop} />
      <ProvidersList open={openProviders} setOpen={setOpenProviders} />
      <EditStop selectedStop={selectedStop} setSelectedStop={setSelectedStop} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: '#E5E8F0',
  },
  container: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.75,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: Dimensions.get('window').height * 0.18,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: '#555',
    alignSelf: 'center',
  },
  emptyMessage: {
    marginTop: Dimensions.get('window').width * 0.05,
  },
  list: {
    flexGrow: 1,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  content: {
    flexGrow: 1,
    marginTop: Dimensions.get('window').height * 0.02,
    maxHeight: Dimensions.get('window').height * 0.6
  },
  button: {
    marginLeft: 'auto',
    marginTop: 'auto',
    marginRight: Dimensions.get('window').width * 0.05,
    marginBottom: Dimensions.get('window').height * 0.02,
  },
  perm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').width * 0.05,
    marginBottom: Dimensions.get('window').height * 0.02,
  },
});
