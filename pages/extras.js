import React from 'react';
import MainLayout from '../src/layouts/MainLayout';
import ExtrasList from '../src/components/ExtrasList';

const ExtrasPage = () => (
  <MainLayout pageTitle="Extra Builds" contentTitle="Extra Builds">
    <ExtrasList />
  </MainLayout>
);

export default ExtrasPage;
