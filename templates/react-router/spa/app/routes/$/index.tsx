import { href } from 'react-router';
import PageWrapper from '@/components/app/PageWrapper';
import LinkButton from '@/components/ui/LinkButton';
import useAppTranslation from '@/hooks/useAppTranslation';

const NotFoundPage = () => {
  const { t } = useAppTranslation();

  return (
    <PageWrapper>
      <h1>{t('NotFoundPage.notFound')}</h1>
      <p>{t('NotFoundPage.pleaseTryADifferentRoute')}</p>
      <LinkButton to={href('/')}>{t('NotFoundPage.home')}</LinkButton>
    </PageWrapper>
  );
};

export default NotFoundPage;
