import { ThemeLayout, ThemeProvider } from "../src/context/ThemeProvider";
import "../src/styles/globals.css";
import "../src/styles/theme.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <ThemeLayout id="app" /* Dark Mode - Exercise */>
        <div className="px-4 m-auto max-w-7xl h-full">
          <Component {...pageProps} />
        </div>
      </ThemeLayout>
    </ThemeProvider>
  )
};

export default MyApp;
