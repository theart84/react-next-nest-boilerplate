import { NextPage } from 'next';

import { ErrorNextItem } from '@common/api/dto/ErrorNext/ErrorNextItem';
import { apiErrorNext } from '@common/api/services/ErrorNext/ApiErrorNext';

const Error: NextPage = () => <>Error</>;

// eslint-disable-next-line @typescript-eslint/require-await
Error.getInitialProps = async ({ err }) => {
  const errorRequest: ErrorNextItem = err || {
    name: 'Unknown error',
    message: '',
  };

  apiErrorNext.sendError(errorRequest);
};

export { Error as default };
