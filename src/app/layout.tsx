import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {ClerkLoaded, ClerkLoading, ClerkProvider} from "@clerk/nextjs";
import {ColorSchemeScript, LoadingOverlay, MantineProvider} from '@mantine/core';
import {Notifications} from "@mantine/notifications";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import Providers from "@/providers";
import NavBar from "@/components/NavBar/NavBar";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'sern bin',
  description: 'A sern-centric snippet sharing platform',
  metadataBase: new URL('https://bin.sern.dev')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
          <MantineProvider>
            <Providers>
              <ClerkLoading>
                <LoadingOverlay visible />
              </ClerkLoading>
              <ClerkLoaded>
                <Notifications limit={10} />
                <NavBar />
                <div style={{ margin: '0 10px 0' }}>
                  {children}
                </div>
              </ClerkLoaded>
            </Providers>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
