import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import MainLayout from '../../layouts/MainLayout';
import {
  KernelsContext,
  DispatchContext,
  withKernelsProvider,
} from '../../contexts';
import { addKernelData } from '../../actions';

const KernelVersion = (props) => {
  const {
    query: { version },
  } = useRouter();

  const { kernels } = useContext(KernelsContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    const getKernelData = async () => {
      const res = await fetch(`http://localhost:3000/api/kernel/${version}`);
      const json = await res.json();

      if (json.success) {
        dispatch(addKernelData(json.data));
      }
    };

    if (!kernels.find((kernel) => kernel.version === version)) {
      getKernelData();
    }
  }, []);

  return (
    <MainLayout pageTitle={`Get Kernel: ${version}`}>
      <div>
        <h2>Kernel version: {version}</h2>
      </div>
    </MainLayout>
  );
};

KernelVersion.getInitialProps = async ({ query }) => {
  // const { version } = query;
  // return { kernel: version };
};

export default withKernelsProvider(KernelVersion);
