import PageWrapper from '@/components/app/PageWrapper';
import LinkButton from '@/components/ui/LinkButton';
import useAppTranslation from '@/hooks/useAppTranslation';

const HomePage = () => {
  const { t } = useAppTranslation();

  return (
    <PageWrapper>
      <h1>{t('HomePage.title')}</h1>
      <p>{t('HomePage.subTitle')}</p>
      <LinkButton to={t('Routes.reactQuery')} className="m-4">
        {t('HomePage.reactQuery')}
      </LinkButton>
      <LinkButton to={t('Routes.reactHookFormZod')} className="m-4">
        {t('HomePage.reactHookFormZod')}
      </LinkButton>
      <LinkButton to={t('Routes.kitchenSink')} className="m-4">
        {t('HomePage.kitchenSink')}
      </LinkButton>
    </PageWrapper>
  );
};

export default HomePage;
