import Center from 'layouts/allcenter';
import Head from 'next/head';

function Dashboard() {
  return (
    <>
      <Head>
        <title>Dash</title>
      </Head>

      <Center>
        <div className="dash-wrapper">

          <h1>Dash</h1>

        </div>
      </Center>

      <style jsx>{`
        .dash-wrapper {
          background: #222;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}

export default Dashboard;