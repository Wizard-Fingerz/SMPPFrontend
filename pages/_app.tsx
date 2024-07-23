import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '../context/UserContext';  // Adjust the import path

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
