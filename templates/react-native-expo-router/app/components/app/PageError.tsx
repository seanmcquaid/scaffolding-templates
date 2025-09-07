import React from 'react';
import { View, Text } from 'react-native';
import useAppTranslation from '@/hooks/useAppTranslation';
import { Button } from '@/components/ui/Button';

interface PageErrorProps {
  errorText?: string;
  titleText?: string;
  onRetry?: () => void;
}

const PageError = ({ errorText, titleText, onRetry }: PageErrorProps) => {
  const { t } = useAppTranslation();

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-2xl font-bold mb-4 text-center text-foreground">
        {titleText || t('Common.error')}
      </Text>
      <Text className="text-base text-center mb-6 text-muted-foreground">
        {errorText || t('Common.somethingWentWrong')}
      </Text>
      {onRetry && (
        <Button
          title={t('Common.tryAgain')}
          onPress={onRetry}
          className="min-w-[120px]"
        />
      )}
    </View>
  );
};

export default PageError;
