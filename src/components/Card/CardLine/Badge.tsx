import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getLineColor } from '../../../constants';

interface LineBadgeProps {
  line: string;
  provider: string;
}

const LineBadge = ({ provider, line }: LineBadgeProps) => {
  const lineColor = getLineColor(provider, line);

  return (
    <View style={{ ...styles.container, ...{ backgroundColor: lineColor, minWidth: line.length > 1 ? line.length * 12 : "8%" } }}>
      <Text style={styles.badge}>{line}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '1%',
  },
  badge: {
    textAlign: "center",
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
  },
});

export default LineBadge;
