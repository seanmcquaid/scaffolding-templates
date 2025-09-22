import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  type TextProps as RNTextProps,
  type TextStyle,
} from 'react-native';

interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  style?: TextStyle;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  style,
  children,
  ...props
}) => {
  const textStyles = [styles.base, styles[variant], styles[color], style];

  return (
    <RNText style={textStyles} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: 'System',
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  primary: {
    color: '#000000',
  },
  secondary: {
    color: '#666666',
  },
  success: {
    color: '#34C759',
  },
  warning: {
    color: '#FF9500',
  },
  error: {
    color: '#FF3B30',
  },
});
