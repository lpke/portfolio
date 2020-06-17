import Link from 'next/link';
import Head from 'next/head';
import Layout from 'components/layout';

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>Internal Page</title>
      </Head>

      <h1>Internal Page</h1>
      <p>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </p>
    </Layout>
  );
}