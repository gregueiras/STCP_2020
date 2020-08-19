import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Stop } from '../../redux/stops/types';
import { getName } from '../../services/aux';

interface CardHeaderProps extends Stop {
  containerStyle: ViewStyle;
  onPress: () => void;
}

const CardHeader = ({ containerStyle, code, provider, customName, onPress }: CardHeaderProps) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.headerText}>{getName({ code, provider, customName })}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    textAlign: "center"
  },
});

export default CardHeader;
