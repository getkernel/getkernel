import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import MainLayout from '../layouts/MainLayout';
import KernelList from '../components/KernelList';

const Home = ({ kernels }) => (
  <MainLayout>
    <KernelList kernels={kernels} />
  </MainLayout>
);

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/kernels');
  const json = await res.json();

  return {
    kernels: json,
  };
};

Home.propTypes = {
  kernels: PropTypes.object.isRequired,
};

export default Home;
