import PageWrapper from '@/components/app/PageWrapper';
import LinkButton from '@/components/ui/LinkButton';
import getAppFixedT from '@/i18n/getAppFixedT';

const HomePage = async () => {
  const { t } = await getAppFixedT();

  return (
    <PageWrapper>
      <h1>{t('HomePage.title')}</h1>
      <p>{t('HomePage.subTitle')}</p>
      <LinkButton className="m-4" href={t('Routes.reactQuery')}>
        {t('HomePage.reactQuery')}
      </LinkButton>
      <LinkButton className="m-4" href={t('Routes.reactHookFormZod')}>
        {t('HomePage.reactHookFormZod')}
      </LinkButton>
      <LinkButton className="m-4" href={t('Routes.kitchenSink')}>
        {t('HomePage.kitchenSink')}
      </LinkButton>
    </PageWrapper>
  );
};

export default HomePage;
