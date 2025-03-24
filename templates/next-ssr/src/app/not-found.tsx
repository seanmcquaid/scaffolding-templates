import PageWrapper from '@/components/app/PageWrapper';
import LinkButton from '@/components/ui/LinkButton';
import getAppFixedT from '@/i18n/getAppFixedT';

const NotFoundPage = async () => {
  const { t } = await getAppFixedT();

  return (
    <PageWrapper>
      <h1>{t('NotFoundPage.notFound')}</h1>
      <p>{t('NotFoundPage.pleaseTryADifferentRoute')}</p>
      <LinkButton href={t('Routes.home')}>{t('NotFoundPage.home')}</LinkButton>
    </PageWrapper>
  );
};

export default NotFoundPage;
