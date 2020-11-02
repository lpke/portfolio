import Link from 'next/link';
import BasicContentArea from 'components/basic-content';
import BasicFooter from 'components/basic-footer';

const Home = () => (
  <>
    <BasicContentArea>
      
      <h1>Next.js Testing</h1>

      <p>
        This website will be the future home of my portfolio, currently live at <a href="https://lpdev.io" target="_blank">lpdev.io</a>
      </p>
      
      <Link href="internal-page">
        <a className="button">Example Page</a>
      </Link>

      <style jsx>{`
        
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    
    </BasicContentArea>

    <BasicFooter />
  </>
);

export default Home;
