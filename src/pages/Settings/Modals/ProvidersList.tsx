import React, { Dispatch, SetStateAction } from 'react';
import Modal from 'react-native-modal';
import { View, FlatList, Text, useWindowDimensions } from 'react-native';
import { PROVIDERS } from '../../../services/aux';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { addProvider, removeProvider } from '../../../redux/providers';
import { styles } from './NewStop'
import { styles as listStyles } from '../ListItem'
import Title from '../../../components/common/Title';
import CheckBox from 'react-native-check-box';
import { defaultColor } from '../../../constants';

interface ProvidersListProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export default function ProvidersList({ open, setOpen }: ProvidersListProps) {
  const providers = useSelector((state: RootState) => state.providers)
  const dispatch = useDispatch()
  const {height} = useWindowDimensions()

  return (
    <Modal
      isVisible={open}
      useNativeDriver={true}
      onSwipeComplete={() => setOpen(false)}
      swipeDirection="down"
      propagateSwipe={true}
      coverScreen={false}
      onBackButtonPress={() => setOpen(false)}
      onBackdropPress={() => setOpen(false)}
    >

      <View style={[styles.container, {flex: 1, marginVertical: "20%"}]}>
        <Title text="Esconder Provedores" lineSize={165} />
        <View style={[styles.content, { height: height * 0.63, marginTop: "5%" }]}>
            <FlatList
              style={{flex:1}}
              data={PROVIDERS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <View style={listStyles.item}>
                  <Text style={listStyles.text}>{item}</Text>
                  <CheckBox
                    isChecked={providers.includes(item)}
                    checkedCheckBoxColor={defaultColor}
                    onClick={() => 
                      providers.includes(item) ? dispatch(removeProvider(item)) : dispatch(addProvider(item))
                    }
                  />
                </View>
              )}
            />
        </View>
      </View>

    </Modal>
  )
}