/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native';

import { defaultColor } from '../../../constants';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  onPress: () => void;
  variant?: 'secondary';
}

const Button = ({ text, onPress, variant, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={variant === 'secondary' ? styles.secondaryButton : styles.button}
      {...rest}
    >
      <Text style={variant === 'secondary' ? styles.secondaryText : styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const buttonStyle: ViewStyle = {
  borderRadius: 5,
  width: 123,
  height: 35,
  justifyContent: 'center',
  alignItems: 'center',
};

const textStyle: TextStyle = {
  fontFamily: 'Montserrat-Medium',
  fontSize: 16,
};

const styles = StyleSheet.create({
  button: {
    ...buttonStyle,
    backgroundColor: defaultColor,
  },
  secondaryButton: {
    ...buttonStyle,
    backgroundColor: 'white',
    borderColor: defaultColor,
    borderWidth: 1.5,
  },
  text: {
    ...textStyle,
    color: 'white',
  },
  secondaryText: {
    ...textStyle,
    color: defaultColor,
  },
});
