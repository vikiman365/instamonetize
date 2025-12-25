import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import StyledComponentsRegistry from '@/lib/registry';
import { GlobalStyles } from '@/styles/GlobalStyles';
import { UserDataProvider } from '@/contexts/UserDataContext';

export const metadata: Metadata = {
  title: 'InstaMonetize | Earn From Your Instagram Content',
  description: 'Official platform for Instagram creators to apply for content monetization and unlock earning potential',
  keywords: ['Instagram monetization', 'content creator', 'earn money', 'social media'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <UserDataProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </UserDataProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}