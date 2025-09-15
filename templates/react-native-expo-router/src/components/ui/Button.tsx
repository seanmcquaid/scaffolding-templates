import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

type ButtonProps = React.ComponentPropsWithoutRef<typeof PaperButton>;

export function Button({ style, ...props }: ButtonProps) {
  return <PaperButton style={[styles.button, style]} {...props} />;
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 4,
  },
});
