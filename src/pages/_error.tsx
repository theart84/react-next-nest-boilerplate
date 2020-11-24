import { IBaseNextPage } from '@common/types/IBaseNextPage';
import { ErrorNextItem } from '@common/api/dto/ErrorNext/ErrorNextItem';

const Error: IBaseNextPage = () => <>Error</>;

Error.init = ({ err, errorApiService }) => {
  const errorRequest: ErrorNextItem = err || {
    name: 'Unknown error',
    message: '',
  };

  errorApiService.sendError(errorRequest);
};

export { Error as default };
