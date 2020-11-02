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
      </>
    );
  }
}

export default App;