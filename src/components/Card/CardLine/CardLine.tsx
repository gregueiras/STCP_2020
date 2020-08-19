import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { Line } from '../../../services/stops';
import Badge from './Badge';

interface CardLineProps {
  lineStop: Line;
  provider: string;
}

const CardLine = ({ lineStop, provider }: CardLineProps) => {
  const { destination, line, remainingTime, time } = lineStop;

  return (
    <View style={styles.container}>
      <Badge line={line} provider={provider} />
      <View style={styles.lineDescription}>
        <Text style={styles.text}>{destination}</Text>
        <Text style={styles.text}>{remainingTime || time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: Dimensions.get('window').width * 0.04,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat',
  },
  lineDescription: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: '3%',
    marginLeft: '3%',
    flexGrow: 1,
  },
});

export default CardLine;
