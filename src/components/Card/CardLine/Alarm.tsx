import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface AlarmProps {
  active: boolean;
  onPress: () => void;
}

const Alarm = ({ active, onPress }: AlarmProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons name={active ? 'bell' : 'bell-outline'} size={24} color="black" />
    </TouchableOpacity>
  );
};

export default Alarm;
