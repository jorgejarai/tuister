import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import type { NextPage } from 'next';

import HomePageView from '@/views/HomePageView';

const Home: NextPage = () => {
  return <HomePageView />;
};

export default withPageAuthRequired(Home);
