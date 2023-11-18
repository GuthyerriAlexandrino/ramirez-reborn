import "./globals.css";
import GlobalStyles from "./styles/global";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ramirez",
  description: "A portfolio site to photographers",
};

import StyledComponentsRegistry from "../lib/registry";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { NotifyProvider } from "./context/NotifyContext";
import { Component } from "react";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <NotifyProvider>
            <AuthProvider>
              {props.children}
              <ToastContainer />
              
                {/* <AnimatePresence exitBeforeEnter>
                  <Component {...pageProps} />
                </AnimatePresence> */}
            </AuthProvider>
          </NotifyProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
