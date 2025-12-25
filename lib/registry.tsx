'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create style sheet once with lazy initial state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  // Wrap everything with ThemeProvider (which uses React Context)
  const content = (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );

  if (typeof window !== 'undefined') {
    // Client-side: don't need style sheet manager
    return content;
  }

  // Server-side: wrap with style sheet manager
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {content}
    </StyleSheetManager>
  );
}