import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getLineColor } from '../../../constants';

interface LineBadgeProps {
  line: string;
}

const LineBadge = ({ line }: LineBadgeProps) => {
  const lineColor = getLineColor(line);

  return (
    <View style={{ ...styles.container, ...{ backgroundColor: lineColor } }}>
      <Text style={styles.badge}>{line}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '1%',
  },
  badge: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
  },
});

export default LineBadge;
