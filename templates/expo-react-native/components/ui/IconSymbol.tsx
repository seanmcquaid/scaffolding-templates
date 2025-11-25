import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | ((props: { focused: boolean; color: string }) => string);
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const iconColor = typeof color === 'function' ? color({ focused: false, color: '#000' }) : color;

  return (
    <MaterialIcons
      color={iconColor}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
