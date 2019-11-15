import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import MainLayout from '../../layouts/MainLayout';

const KernelVersion = ({ kernel }) => {
  const {
    query: { version },
  } = useRouter();

  return (
    <MainLayout pageTitle={`Get Kernel ${version}`}>
      <div>
        <h2>Kernel version: {version}</h2>
      </div>
    </MainLayout>
  );
};

KernelVersion.getInitialProps = async ({ query }) => {
  const { version } = query;
  const res = await fetch(`http://localhost:3000/api/kernel/${version}`);
  const json = await res.json();

  return { kernel: json };
};

export default KernelVersion;
