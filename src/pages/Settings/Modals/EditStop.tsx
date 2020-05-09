import React, { SetStateAction, Dispatch, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';

import Button from '../../../components/common/Button';
import Title from '../../../components/common/Title';
import { editStop } from '../../../redux/stops/actions';
import { Stop } from '../../../redux/stops/types';

interface NewStopProps {
  selectedStop?: Stop;
  setSelectedStop: Dispatch<SetStateAction<Stop | undefined>>;
}

const NewStop = ({ selectedStop, setSelectedStop }: NewStopProps) => {
  const [customName, setCustomName] = useState(selectedStop?.customName);
  const dispatch = useDispatch();

  function reset() {
    setCustomName('');
    setSelectedStop(undefined);
  }

  useEffect(() => {
    setCustomName(selectedStop?.customName);
  }, [selectedStop]);

  return (
    <Modal
      avoidKeyboard
      isVisible={!!selectedStop}
      onSwipeComplete={() => setSelectedStop(undefined)}
      swipeDirection="down"
      coverScreen={false}
    >
      <View style={styles.container}>
        <View>
          <Title text="Personalizar" lineSize={100} />
        </View>
        <View style={styles.content}>
          <View>
            <Text style={styles.label}>Nome Personalizado</Text>
            <TextInput value={customName} onChangeText={setCustomName} style={styles.input} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Cancelar" onPress={() => reset()} variant="secondary" />
          <Button
            text="Confirmar"
            onPress={() => {
              if (selectedStop)
                dispatch(
                  editStop({
                    code: selectedStop.code,
                    provider: selectedStop.provider,
                    customName,
                  }),
                );
              reset();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default NewStop;

const styles = StyleSheet.create({
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
    borderColor: '#000000',
    borderWidth: 1.5,
    borderRadius: 5,
    marginHorizontal: 5,
    height: 40,
  },
  label: {
    marginHorizontal: 5,
    fontFamily: 'Montserrat',
    marginBottom: 5,
  },
});
