import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';

import type { PageWithParams } from '@/types/AppPropsWithPageParams';

import HomePageView from '@/views/HomePageView';

const Home: PageWithParams = () => {
  return <HomePageView />;
};

Home.pageParams = {
  title: 'Tuister',
};

export default withPageAuthRequired(Home);
