import React, { SetStateAction, Dispatch, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';

import Button from '../../../components/common/Button';
import Title from '../../../components/common/Title';
import { defaultColor } from '../../../constants';
import { addStop } from '../../../redux/stops/actions';

interface NewStopProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NewStop = ({ open, setOpen }: NewStopProps) => {
  const [provider, setProvider] = useState('STCP');
  const [stop, setStop] = useState('');
  const dispatch = useDispatch();

  function reset() {
    setProvider('STCP');
    setStop('');
    setOpen(false);
  }

  function triggerAdd() {
    if (stop === '') return;

    dispatch(addStop({ code: stop, provider }));
    reset();
  }

  return (
    <Modal
      avoidKeyboard
      isVisible={open}
      onSwipeComplete={() => setOpen(false)}
      swipeDirection="down"
      coverScreen={false}
    >
      <View style={styles.container}>
        <View>
          <Title text="Nova Paragem" lineSize={130} />
        </View>
        <View style={styles.content}>
          {/* <View>
            <Text style={styles.label}>Fornecedor</Text>
            <TextInput
              value={provider}
              onChangeText={setProvider}
              style={styles.input}
            />
          </View> */}
          <View>
            <Text style={styles.label}>Paragem</Text>
            <TextInput value={stop} onChangeText={setStop} style={styles.input} onSubmitEditing={() => triggerAdd()} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button text="Cancelar" onPress={() => reset()} variant="secondary" />
          <Button text="Confirmar" disabled={stop === ''} onPress={() => triggerAdd()} />
        </View>
      </View>
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
    height: 40,
    paddingLeft: Dimensions.get('screen').width * 0.03,
  },
  label: {
    marginHorizontal: Dimensions.get('screen').width * 0.03,
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5,
  },
});
