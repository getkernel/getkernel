import React from 'react';
import PropTypes from 'prop-types';
import MainLayout from '../layouts/MainLayout';
import KernelList from '../components/KernelList';
import { KernelsProvider } from '../contexts';

const Home = () => (
  <MainLayout>
    <KernelsProvider>
      <KernelList />
    </KernelsProvider>
  </MainLayout>
);

Home.propTypes = {};

export default Home;
