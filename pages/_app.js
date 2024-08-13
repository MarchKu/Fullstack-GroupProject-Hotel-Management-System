import "../styles/globals.css";
import { AuthProvider } from "../contexts/authentication.js";
import { BookingContextProvider } from "@/contexts/booking";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <BookingContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BookingContextProvider>
    </AuthProvider>
  );
}
