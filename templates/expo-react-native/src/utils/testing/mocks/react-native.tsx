import React from 'react';

export const StyleSheet = {
  create: <T extends Record<string, unknown>>(styles: T): T => styles,
};

export const useColorScheme = jest.fn(() => 'light' as const);

export const Text = ({ children, ...props }: Record<string, unknown>) =>
  React.createElement(
    'span',
    props as React.HTMLAttributes<HTMLSpanElement>,
    children as React.ReactNode
  );

export const View = ({ children, ...props }: Record<string, unknown>) =>
  React.createElement(
    'div',
    props as React.HTMLAttributes<HTMLDivElement>,
    children as React.ReactNode
  );

export const ScrollView = ({ children, ...props }: Record<string, unknown>) =>
  React.createElement(
    'div',
    props as React.HTMLAttributes<HTMLDivElement>,
    children as React.ReactNode
  );

export const TouchableOpacity = ({
  children,
  onPress,
  disabled,
  ...props
}: Record<string, unknown>) =>
  React.createElement(
    'button',
    {
      onClick: disabled ? undefined : (onPress as (() => void) | undefined),
      disabled,
      ...props,
    } as React.ButtonHTMLAttributes<HTMLButtonElement>,
    children as React.ReactNode
  );

export const TextInput = ({ onChangeText, ...props }: Record<string, unknown>) =>
  React.createElement('input', {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (typeof onChangeText === 'function') {
        onChangeText(e.target.value);
      }
    },
    ...props,
  } as React.InputHTMLAttributes<HTMLInputElement>);

export const ActivityIndicator = (props: Record<string, unknown>) =>
  React.createElement('div', {
    'data-testid': 'activity-indicator',
    ...props,
  } as React.HTMLAttributes<HTMLDivElement>);

export const Switch = ({ value, onValueChange, ...props }: Record<string, unknown>) =>
  React.createElement('input', {
    type: 'checkbox',
    checked: value as boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (typeof onValueChange === 'function') {
        onValueChange(e.target.checked);
      }
    },
    ...props,
  } as React.InputHTMLAttributes<HTMLInputElement>);

export const Alert = {
  alert: jest.fn(),
};
