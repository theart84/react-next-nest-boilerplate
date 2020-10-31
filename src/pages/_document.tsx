import BaseDocument, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { DocumentInitialProps } from 'next/dist/next-server/lib/utils';

export default class MyDocument extends BaseDocument {
  public static async getInitialProps(
    context: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (properties) =>
            sheet.collectStyles(<App {...properties} />),
        });

      const initialProperties = await BaseDocument.getInitialProps(context);

      return {
        ...initialProperties,
        styles: (
          <>
            {initialProperties.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
