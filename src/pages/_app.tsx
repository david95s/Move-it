import '../styles/Globals.css';
import {ChallengesProvider} from '../contexts/ChallengesContexts'

function MyApp({ Component, pageProps }) {
  return  (
      <Component {...pageProps} />
  );
}

export default MyApp;
