/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  Dimensions,
} from 'react-native';

import { defaultColor } from '../../../constants';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  onPress: () => void;
  variant?: 'secondary';
  disabled?: boolean;
}

const Button = ({ text, onPress, variant, disabled = false, ...rest }: ButtonProps) => {
  const computeStyle = () => {
    if (disabled) {
      return [styles.disabledButton, styles.disabledText];
    }
    if (variant === 'secondary') {
      return [styles.secondaryButton, styles.secondaryText];
    }

    return [styles.button, styles.text];
  };

  const [containerStyle, textStyle] = computeStyle();

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={containerStyle} {...rest}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const buttonStyle: ViewStyle = {
  borderRadius: 5,
  width: 120 + Dimensions.get('screen').fontScale * 10,
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
  disabledButton: {
    ...buttonStyle,
    backgroundColor: '#EEEEEE',
  },
  text: {
    ...textStyle,
    color: 'white',
  },
  secondaryText: {
    ...textStyle,
    color: defaultColor,
  },
  disabledText: {
    ...textStyle,
    color: '#c0c0c0',
  },
});
