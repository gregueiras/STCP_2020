import { Ionicons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { removeStop } from '../../redux/stops/actions';
import { Stop } from '../../redux/stops/types';
import { getName } from '../../services/aux';

interface ListItemProps {
  stop: Stop;
  setSelectedStop: Dispatch<SetStateAction<Stop | undefined>>;
}

const ListItem = ({ stop, setSelectedStop }: ListItemProps) => {
  const { code, provider } = stop;
  const dispatch = useDispatch();

  const name = getName(stop);

  return (
    <View style={styles.item}>
      <View>
        <Text numberOfLines={1} style={styles.text}>
          {name}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setSelectedStop(stop)}>
          <Ionicons name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-create`} size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(removeStop({ code, provider }))}>
          <Ionicons name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-trash`} size={32} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Dimensions.get('screen').width * 0.03,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width * 0.15,
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    maxWidth: Dimensions.get('screen').width * 0.6,
  },
});

export default ListItem;
