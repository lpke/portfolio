import Center from 'layouts/allcenter';
import Head from 'next/head';
import Input from 'components/input';

function Dashboard() {
  return (
    <>
      <Head>
        <title>Dash</title>
      </Head>

      <Center bgColor="#2A2A2E">
        <div className="dash-wrapper">

          <Input
            id="search"
            className="dash-search"
            mono
          />

        </div>
      </Center>

      <style jsx>{`
        .dash-wrapper {
          background: #2A2A2E;
          color: #f7f7f7;
          width: 100%;
          padding: 15vmin;
          display: flex;
          flex-direction: column;
          justify-items: center;
          justify-content: center;
        }
      `}</style>

      <style jsx global>{`
        input.input.dash-search {
          height: 55px;
          //...
        }
      `}</style>
    </>
  );
}

export default Dashboard;