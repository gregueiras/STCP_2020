import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

interface AlarmProps {
  active: boolean;
}

const Alarm = ({ active }: AlarmProps) => {
  return <MaterialCommunityIcons name={active ? 'bell' : 'bell-outline'} size={24} color="black" />;
};

export default Alarm;
