import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { SymbolWeight } from 'expo-symbols';
import type React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as Partial<Record<string, React.ComponentProps<typeof MaterialIcons>['name']>>;

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

  return <MaterialIcons color={iconColor} size={size} name={MAPPING[name]} style={style} />;
}
