import './globals.css'
import GlobalStyles from './app/styles/global';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ramirez',
  description: 'A portfolio site to photographers',
}

import StyledComponentsRegistry from './lib/registry'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang='pt-BR'>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          {props.children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}