import { FC } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    height: 100%;
  }
  
  #app {
    height: 100%;
  }
`;

const layout = {};

export const Layout: FC = ({ children }) => (
  <ThemeProvider theme={layout}>
    <Normalize />
    <GlobalStyle />
    {children}
  </ThemeProvider>
);
