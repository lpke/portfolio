import Head from 'next/head';
import Link from 'next/link';
import BasicContentArea from 'components/basic-content';

export default function FirstPost() {
  return (
    <BasicContentArea>
      <Head>
        <title>Internal Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Internal Page</h1>
      <p>
        Example internal page.
      </p>

      <Link href="/">
        <a className="button">Back to home</a>
      </Link>

    </BasicContentArea>
  );
}