import '../styles/globals.css';

import dynamic from 'next/dynamic';

const StarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
