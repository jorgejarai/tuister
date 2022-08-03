import { NextPage } from 'next';
import { AppProps } from 'next/app';

export interface PageParams {
  title?: string;
}

export type PageWithParams = NextPage & {
  pageParams?: PageParams;
};

interface AppPropsWithPageParams extends Omit<AppProps, 'Component'> {
  Component: PageWithParams;
}

export default AppPropsWithPageParams;
