import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainLayout from '../src/layouts/MainLayout';
import KernelList from '../src/components/KernelList';
import { KernelsProvider } from '../src/contexts';

const Home = () => (
  <Fragment>
    <CssBaseline />
    <MainLayout>
      <KernelsProvider>
        <KernelList />
      </KernelsProvider>
    </MainLayout>
  </Fragment>
);

export default Home;
