import "../styles/globals.css";
import { AuthProvider } from "../contexts/authentication.js";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
