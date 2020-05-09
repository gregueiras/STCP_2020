import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, FlatList, ViewToken } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import Card from '../components/Card/Card';
import { defaultColor } from '../constants';
import { Stop } from '../redux/stops/types';
import { getName } from '../services/aux';
import sharedStyles from './styles';

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
  const { stops } = useSelector((state: RootState) => state);
  const [location, setLocation] = useState<Region | undefined>(defaultState);
  const mapRef = useRef<MapView>(null);

  const onViewRef = useRef(({ viewableItems }: OnView) => {
    if (viewableItems.length === 0) return;

    const { location: loc } = viewableItems[0].item as Stop;

    if (loc) {
      const offsetLocation = {
        ...loc,
        latitude: loc.latitude - 0.0015,
      };

      const region = { ...offsetLocation, ...defaultDelta };
      // eslint-disable-next-line no-unused-expressions
      mapRef.current?.animateToRegion(region);
    } else {
      setLocation(undefined);
    }
  });
  const viewConfigRef = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 200,
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={sharedStyles.buttonRight} onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="ios-settings" size={32} color="black" />
      </TouchableOpacity>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.list}
        data={stops}
        renderItem={({ item }) => <Card code={item.code} provider={item.provider} customName={item.customName} />}
        keyExtractor={({ code, provider }) => `${code}_${provider}`}
        onViewableItemsChanged={onViewRef.current}
        ListEmptyComponent={() => <Card code="" provider="" message="Acrescente algumas paragens!" />}
        viewabilityConfig={viewConfigRef.current}
      />
      <MapView
        style={styles.mapStyle}
        region={location ?? defaultState}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        ref={mapRef}
        toolbarEnabled={false}
        compassOffset={{ x: -Dimensions.get('window').width * 0.86, y: 0 }}
      >
        {stops.map((stop) => {
          const { location: loc } = stop;
          if (loc) return <Marker key={JSON.stringify(loc)} coordinate={loc} title={getName(stop)} />;
          return undefined;
        })}
      </MapView>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
