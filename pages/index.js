import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainLayout from '../layouts/MainLayout';
import KernelList from '../components/KernelList';
import { KernelsProvider } from '../contexts';

const Home = () => (
  <MainLayout>
    <CssBaseline />
    <KernelsProvider>
      <KernelList />
    </KernelsProvider>
  </MainLayout>
);

Home.propTypes = {};

export default Home;
