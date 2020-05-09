import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import BackBlob from '../../svg/Back';
import Blob1 from '../../svg/Blob1';
import Blob2 from '../../svg/Blob2';
import sharedStyles from '../styles';

const Settings = () => {
  const navigation = useNavigation();

  return (
    <>
      <BackBlob style={styles.blobBack} />
      <Blob1 style={styles.blob1} />
      <Blob2 style={styles.blob2} />
      <TouchableOpacity style={sharedStyles.buttonLeft} onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={32} color="white" />
      </TouchableOpacity>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  blobBack: {
    position: 'absolute',
    top: -180,
    left: -130,
    transform: [{ rotate: '120deg' }],
  },
  blob1: {
    position: 'absolute',
    opacity: 0.15,
    top: -120,
    right: -70,
    transform: [{ rotate: '120deg' }],
  },
  blob2: {
    position: 'absolute',
    opacity: 0.15,
    top: -10,
  },
});
