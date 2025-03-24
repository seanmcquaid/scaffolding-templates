import PageWrapper from '@/components/app/PageWrapper';
import LinkButton from '@/components/ui/LinkButton';
import getAppFixedT from '@/i18n/getAppFixedT';

const HomePage = async () => {
  const { t } = await getAppFixedT();

  return (
    <PageWrapper>
      <h1>{t('HomePage.title')}</h1>
      <p>{t('HomePage.subTitle')}</p>
      <LinkButton href={t('Routes.reactQuery')} className="m-4">
        {t('HomePage.reactQuery')}
      </LinkButton>
      <LinkButton href={t('Routes.reactHookFormZod')} className="m-4">
        {t('HomePage.reactHookFormZod')}
      </LinkButton>
      <LinkButton href={t('Routes.kitchenSink')} className="m-4">
        {t('HomePage.kitchenSink')}
      </LinkButton>
    </PageWrapper>
  );
};

export default HomePage;
