import React from 'react';
import { StyleSheet } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';

type CardProps = React.ComponentPropsWithoutRef<typeof PaperCard>;

export function Card({ style, ...props }: CardProps) {
  return <PaperCard style={[styles.card, style]} {...props} />;
}

Card.Content = PaperCard.Content;
Card.Actions = PaperCard.Actions;
Card.Title = PaperCard.Title;

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
});
