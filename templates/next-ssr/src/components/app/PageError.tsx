'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import useAppTranslation from '@/hooks/useAppTranslation';

interface PageErrorProps {
  titleText?: string;
  errorText?: string;
}

const PageError = ({ errorText, titleText }: PageErrorProps) => {
  const { t } = useAppTranslation();
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex h-full w-full flex-col p-8">
      <h1>{titleText ? titleText : t('PageError.title')}</h1>
      {!!errorText && <p>{errorText}</p>}
      <Button onClick={handleGoBack}>{t('PageError.goBack')}</Button>
    </div>
  );
};

export default PageError;
