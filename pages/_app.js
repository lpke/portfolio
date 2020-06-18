import 'styles/global.scss';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      
      <footer>
        <a href="https://lpdev.io" target="_blank">
          &copy; LPDev {new Date().getFullYear()}
        </a>
      </footer>
    </>
  );
}