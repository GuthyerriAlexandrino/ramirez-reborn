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
import { AuthProvider } from "./context/AuthContext";
import { NotifyProvider } from "./context/NotifyContext";
import ToastContainerWrapper from "./context/ToastContainerWrapper";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <NotifyProvider>
            <AuthProvider>
              {props.children}
              <ToastContainerWrapper />
            </AuthProvider>
          </NotifyProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
