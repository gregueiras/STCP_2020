import React, { SetStateAction, Dispatch, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, useWindowDimensions, Animated } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input'
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
// @ts-ignore
import useKeyboard from '@rnhooks/keyboard';

import Button from '../../../components/common/Button';
import Title from '../../../components/common/Title';
import { defaultColor } from '../../../constants';
import { addStop } from '../../../redux/stops/actions';
import { Stop } from '../../../redux/stops/types';
import { searchStop } from '../../../services/search';
import { stopToString } from '../../../services/aux';

interface NewStopProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewStop = ({ open, setOpen }: NewStopProps) => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [query, setQuery] = useState('');
  const [stop, setStop] = useState<Stop>();
  const dispatch = useDispatch();
  const [visibleKeyboard] = useKeyboard();
  const { height } = useWindowDimensions()
  const modalAnim = useRef(new Animated.Value(0)).current
  const inputAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const duration = 200
    if (visibleKeyboard) {
      Animated.timing(
        modalAnim,
        {
          toValue: 0.4 * height,
          duration,
        }
      ).start();
    } else {
      Animated.timing(
        modalAnim,
        {
          toValue: 0,
          duration,
        }
      ).start();
    }
  }, [modalAnim, visibleKeyboard])

  useEffect(() => {
    const duration = 200
    if (stops.length > 0) {
      Animated.timing(
        inputAnim,
        {
          toValue: -0.2 * height,
          duration,
        }
      ).start();
    } else {
      Animated.timing(
        inputAnim,
        {
          toValue: 0,
          duration,
        }
      ).start();
    }
  }, [inputAnim, stops])

  function reset() {
    setQuery('')
    setStops([])
    setOpen(false)
    modalAnim.setValue(0)
  }

  function triggerAdd() {
    if (stop === undefined) return;

    dispatch(addStop({ code: stop.code, provider: stop.provider }));
    reset();
  }

  useEffect((() => {
    async function getStops() {
      const sts = await searchStop(query)
      setStops(sts)
    }

    if (query !== "")
      getStops()
  }), [query])

  return (
    <Modal
      avoidKeyboard
      isVisible={open}
      useNativeDriver={true}
      onSwipeComplete={() => { setOpen(false), reset() }}
      swipeDirection="down"
      propagateSwipe={true}
      coverScreen={false}
    >
      <Animated.View style={[styles.container, { marginBottom: modalAnim as unknown as number }]}>
        <View>
          <Title text="Nova Paragem" lineSize={130} />
        </View>
        <Animated.View style={[styles.content, { marginTop: inputAnim as unknown as number }]}>
          <Autocomplete
            data={stops}
            defaultValue={query}
            inputContainerStyle={[styles.input, { borderBottomWidth: stops.length > 0 ? 0 : 1.5, borderBottomLeftRadius: stops.length > 0 ? 0 : 5, borderBottomRightRadius: stops.length > 0 ? 0 : 5 }]}
            listStyle={styles.listContainer}
            onChangeText={text => setQuery(text)}
            keyExtractor={(item) => stopToString(item)}
            renderItem={({ item, index }) => (
              <TouchableOpacity key={stopToString(item) + index} onPress={() => { setStop(item); setQuery(stopToString(item)) }}>
                <Text>{stopToString(item)}</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
        <View style={styles.buttonContainer}>
          <Button text="Cancelar" onPress={() => reset()} variant="secondary" />
          <Button text="Confirmar" disabled={stop === undefined} onPress={() => triggerAdd()} />
        </View>
      </Animated.View>
    </Modal>
  );
};

export default NewStop;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: '50%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: Dimensions.get('screen').width * 0.05,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  input: {
    borderColor: defaultColor,
    borderWidth: 1.5,
    borderRadius: 5,
    marginHorizontal: Dimensions.get('screen').width * 0.03,
    paddingHorizontal: Dimensions.get('screen').width * 0.03,
  },
  listContainer: {
    overflow: "scroll",
    backgroundColor: "#F5F5F5",
    height: Dimensions.get('screen').height * 0.2,
    marginHorizontal: Dimensions.get('screen').width * 0.03,
    paddingHorizontal: Dimensions.get('screen').width * 0.03,
    borderColor: defaultColor,
    borderWidth: 1.5,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
  },
  label: {
    marginHorizontal: Dimensions.get('screen').width * 0.03,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
  },
});
