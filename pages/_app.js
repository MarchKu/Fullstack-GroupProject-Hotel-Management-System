import "../styles/globals.css";
import { AuthProvider } from "../contexts/authentication.js";
import { BookingContextProvider } from "@/contexts/booking";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <BookingContextProvider>
        <Component {...pageProps} />
      </BookingContextProvider>
    </AuthProvider>
  );
}
