import 'styles/global.scss';
import TagManager from 'react-gtm-module';

class App extends React.Component {
  componentDidMount() {
    /* Google Tag Manager */
    const tagManagerArgs = {
      gtmId: 'GTM-KDQ9GWC'
    };
    TagManager.initialize(tagManagerArgs);
  }
  
  render() {
    let Component = this.props.Component;
    let pageProps = this.props.pageProps;

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
}

export default App;