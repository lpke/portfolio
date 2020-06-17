import Head from 'next/head';
import Link from 'next/link';

const Home = () => (
  <div className="container">
    <Head>
      <title>LPDev Testing</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className="title">
        Next.js Testing
      </h1>

      <div className="description">
        <p>This website will be the future home of my portfolio, currently live at <a href="https://lpdev.io" target="_blank">lpdev.io</a></p>
        
        <Link href="/posts/first-post"><a className="button">Internal Page</a></Link>
      </div>
    </main>

    <footer>
      <a href="https://lpdev.io" target="_blank">
        &copy; LPDev {new Date().getFullYear()}
      </a>
    </footer>

    <style jsx>{`
      .container {
        min-height: 100vh;
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      main {
        padding: 5rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      footer {
        width: 100%;
        height: 100px;
        border-top: 1px solid #eaeaea;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      main a {
        color: #0070f3;
        text-decoration: none;
      }

      main a:hover:not(.button) {
        text-decoration: underline;
      }

      .title {
        margin: 0;
        line-height: 1.15;
        font-size: 3.2rem;
      }

      .title,
      .description {
        text-align: center;
      }

      .description {
        line-height: 1.5;
        font-size: 1.3rem;
      }

      code {
        background: #fafafa;
        border-radius: 5px;
        padding: 0.75rem;
        font-size: 1.1rem;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
      }

      .button {
        display: inline-block;
        background: #0077F6;
        color: white !important;
        padding: 6px 22px;
        border-radius: 8px;
        margin-top: 10px;
        transition: background 0.2s linear;
      }
      .button:hover {
        background: #2790FF;
      }
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
  </div>
);

export default Home;
