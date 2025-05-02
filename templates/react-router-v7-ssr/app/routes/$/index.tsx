import PageWrapper from '@/components/app/PageWrapper';
import useAppTranslation from '@/hooks/useAppTranslation';
import LinkButton from '@/components/ui/LinkButton';
import { href } from 'react-router';

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
