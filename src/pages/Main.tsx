import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, FlatList, ViewToken } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import Card from '../components/Card/Card';
import { defaultColor } from '../constants';
import { Stop, StopLocation } from '../redux/stops/types';
import { getName } from '../services/aux';
import { UserLocation, distance } from '../services/location';
import { searchNearMe, LocationResponse } from '../services/search';
import sharedStyles from './styles';
import TempStop from './Settings/Modals/TempStop';

interface OnView {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

const defaultDelta = {
  latitudeDelta: 0.00922,
  longitudeDelta: 0.00421,
};

const defaultState = {
  ...defaultDelta,
  latitude: 41.14961,
  longitude: -8.61099,
};

export default function App() {
  const navigation = useNavigation();
  const { stops, providers } = useSelector((state: RootState) => state);
  const [userLocation, setUserLocation] = useState<UserLocation>();
  const [isInFirstItem, setIsInFirstItem] = useState(true);
  const [nearStops, setNearStops] = useState<LocationResponse[]>([]);
  const [stopSelected, setStopSelected] = useState<Stop>();
  const [isOpenStopModal, setIsOpenStopModal] = useState(false);


  useEffect(() => {
    watchLocation();
  }, []);

  const mapRef = useRef<MapView>(null);
  const listRef = useRef<FlatList>(null);

  const onViewRef = useRef(({ viewableItems }: OnView) => {
    if (viewableItems.length === 0) return;

    setIsInFirstItem(viewableItems[0].index === 0);

    const { location: loc } = viewableItems[0].item as Stop;

    if (loc) {
      const region = calcRegion(loc);
      // eslint-disable-next-line no-unused-expressions
      mapRef.current?.animateToRegion(region);
    }
  });
  const viewConfigRef = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 200,
  });

  const watchLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, timeInterval: 1000 * 5, distanceInterval: 30 },
        (position) => {
          const { coords } = position;
          const { latitude, longitude } = coords;

          setUserLocation({ latitude, longitude });
        },
      );
    }
  };

  const sortedList = useMemo(() => {
    if (userLocation) {
      const sorted = stops.sort(({ location: cA }, { location: cB }) => {
        if (cA && cB) {
          return distance(cA, userLocation) - distance(cB, userLocation);
        }
        return 1;
      });
      return sorted;
    }

    return stops;
  }, [stops, userLocation]);

  const loadNearStops = async (region: Region) => {
    const data = await searchNearMe(region)
    setNearStops(data)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={sharedStyles.buttonLeft}
        onPress={() => {
          isInFirstItem
            ? mapRef.current?.animateToRegion(calcRegion(sortedList[0]?.location ?? userLocation ?? defaultState))
            : listRef.current?.scrollToIndex({ index: 0 });
        }}
      >
        <MaterialIcons name="my-location" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={sharedStyles.buttonRight} onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="ios-settings" size={32} color="black" />
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.list}
        ref={listRef}
        data={sortedList}
        renderItem={({ item }) => <Card code={item.code} provider={item.provider} customName={item.customName} />}
        keyExtractor={({ code, provider }) => `${code}_${provider}`}
        onViewableItemsChanged={onViewRef.current}
        ListEmptyComponent={() => <Card code="" provider="" message="Acrescente algumas paragens!" />}
        viewabilityConfig={viewConfigRef.current}
      />
      <MapView
        onRegionChangeComplete={loadNearStops}
        style={styles.mapStyle}
        initialRegion={calcRegion(sortedList.length === 0 ? userLocation : sortedList[0].location)}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass={false}
        ref={mapRef}
        toolbarEnabled={false}
        compassOffset={{ x: -Dimensions.get('window').width * 0.86, y: 0 }}
        onCalloutPress={(event) => {
          const [temp, customName] = (event.nativeEvent as any).id.split("#")
          const [provider, code] = temp.split("_")
          setStopSelected({ code, provider, customName })
          setIsOpenStopModal(true)
        }}
      >
        {stops.map((stop) => {
          const { location: loc } = stop;
          if (loc) return <Marker key={JSON.stringify(loc)} coordinate={loc} title={getName(stop)}
            identifier={`${stop.provider}_${stop.code}#${stop.customName}`} />;
          return undefined;
        })}
        {nearStops.filter((stop) => !providers.includes(stop.Provider as any)).map((stop) =>
          <Marker
            pinColor={"navy"}
            key={stop.Code + stop.Name}
            identifier={[stop.Code, stop.Name].join("#")}
            coordinate={{ latitude: stop.CoordX, longitude: stop.CoordY }}
            title={getName({ provider: stop.Provider, code: stop.Code.split("_")[1] }, false)}
          />
        )}
      </MapView>
      <TempStop open={isOpenStopModal} setOpen={setIsOpenStopModal} stop={stopSelected} />
    </View>
  );


}

const headerSize = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    zIndex: 1,
  },
  list: {
    position: 'absolute',
    display: 'flex',
    zIndex: 2,
    bottom: '5%',
    width: '100%',
    height: '40%',
    flexDirection: 'row',
  },
  header: {
    backgroundColor: defaultColor,
    height: `${headerSize + 0.1}%`,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    backgroundColor: '#FFFFFF',
    height: `${100 - headerSize}%`,
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

function calcRegion(loc: StopLocation | undefined) {
  if (!loc) return defaultState;

  const offsetLocation = {
    ...loc,
    latitude: loc.latitude - 0.0015,
  };

  const region = { ...offsetLocation, ...defaultDelta };
  return region;
}
