import React from "react";
import "../styles/global.css";
import { BrowserRouter } from 'react-router-dom';


import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
};



export default MyApp;

