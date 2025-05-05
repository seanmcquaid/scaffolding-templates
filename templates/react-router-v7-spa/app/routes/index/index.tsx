import { href } from 'react-router';
import PageWrapper from '@/components/app/PageWrapper';
import LinkButton from '@/components/ui/LinkButton';
import useAppTranslation from '@/hooks/useAppTranslation';

const HomePage = () => {
  const { t } = useAppTranslation();

  return (
    <PageWrapper>
      <h1>{t('HomePage.title')}</h1>
      <p>{t('HomePage.subTitle')}</p>
      <LinkButton className="m-4" to={href('/react-query')}>
        {t('HomePage.reactQuery')}
      </LinkButton>
      <LinkButton className="m-4" to={href('/react-hook-form-zod')}>
        {t('HomePage.reactHookFormZod')}
      </LinkButton>
      <LinkButton className="m-4" to={href('/kitchen-sink')}>
        {t('HomePage.kitchenSink')}
      </LinkButton>
    </PageWrapper>
  );
};

export default HomePage;
