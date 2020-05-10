import React, { SetStateAction, Dispatch, useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';

import Button from '../../../components/common/Button';
import Title from '../../../components/common/Title';
import { editStop } from '../../../redux/stops/actions';
import { Stop } from '../../../redux/stops/types';
import { styles } from './NewStop';

interface NewStopProps {
  selectedStop?: Stop;
  setSelectedStop: Dispatch<SetStateAction<Stop | undefined>>;
}

const NewStop = ({ selectedStop, setSelectedStop }: NewStopProps) => {
  const [customName, setCustomName] = useState(selectedStop?.customName);
  const dispatch = useDispatch();

  useEffect(() => {
    setCustomName(selectedStop?.customName);
  }, [selectedStop]);

  function reset() {
    setCustomName('');
    setSelectedStop(undefined);
  }

  function triggerEdit() {
    if (selectedStop)
      dispatch(
        editStop({
          code: selectedStop.code,
          provider: selectedStop.provider,
          customName,
        }),
      );
    reset();
  }

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
            <TextInput
              value={customName}
              onChangeText={setCustomName}
              style={styles.input}
              onSubmitEditing={() => triggerEdit()}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Cancelar" onPress={() => reset()} variant="secondary" />
          <Button text="Confirmar" onPress={() => triggerEdit()} />
        </View>
      </View>
    </Modal>
  );
};

export default NewStop;
