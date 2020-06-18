import Head from 'next/head';
import styles from 'components/basic-content.module.scss';

function BasicContentArea({ children, title }) {
  return (
    <>
      <Head>
        <title>{title || 'LPDev App'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        {children}
      </div>
    </>
  );
}

export default BasicContentArea;