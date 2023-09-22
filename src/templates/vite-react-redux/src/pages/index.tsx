import PageWrapper from '@/components/app/PageWrapper';
import LinkButton from '@/components/ui/LinkButton';
import useAppTranslation from '@/i18n/useAppTranslation';

const HomePage = () => {
  const { t } = useAppTranslation();

  return (
    <PageWrapper>
      <h1>{t('HomePage.title')}</h1>
      <p>{t('HomePage.subTitle')}</p>
      <LinkButton to="/react-query" className="m-4">
        {t('HomePage.reactQuery')}
      </LinkButton>
      <LinkButton to="/react-hook-form-zod" className="m-4">
        {t('HomePage.reactHookFormZod')}
      </LinkButton>
      <LinkButton to="/react-router-generouted" className="m-4">
        {t('HomePage.reactRouterGenerouted')}
      </LinkButton>
      <LinkButton to="/kitchen-sink" className="m-4">
        {t('HomePage.kitchenSink')}
      </LinkButton>
    </PageWrapper>
  );
};

export default HomePage;
