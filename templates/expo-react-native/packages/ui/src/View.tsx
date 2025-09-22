import React from 'react';
import {
  View as RNView,
  StyleSheet,
  type ViewProps as RNViewProps,
  type ViewStyle,
} from 'react-native';

interface ViewProps extends RNViewProps {
  padding?: 'none' | 'small' | 'medium' | 'large';
  margin?: 'none' | 'small' | 'medium' | 'large';
  backgroundColor?: 'primary' | 'secondary' | 'transparent';
  style?: ViewStyle;
}

export const View: React.FC<ViewProps> = ({
  padding = 'none',
  margin = 'none',
  backgroundColor = 'transparent',
  style,
  children,
  ...props
}) => {
  const viewStyles = [
    styles.base,
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    styles[`margin${margin.charAt(0).toUpperCase() + margin.slice(1)}`],
    styles[backgroundColor],
    style,
  ];

  return (
    <RNView style={viewStyles} {...props}>
      {children}
    </RNView>
  );
};

const styles = StyleSheet.create({
  base: {},
  paddingNone: {
    padding: 0,
  },
  paddingSmall: {
    padding: 8,
  },
  paddingMedium: {
    padding: 16,
  },
  paddingLarge: {
    padding: 24,
  },
  marginNone: {
    margin: 0,
  },
  marginSmall: {
    margin: 8,
  },
  marginMedium: {
    margin: 16,
  },
  marginLarge: {
    margin: 24,
  },
  primary: {
    backgroundColor: '#FFFFFF',
  },
  secondary: {
    backgroundColor: '#F2F2F7',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});