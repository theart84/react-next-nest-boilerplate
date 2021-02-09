export const IS_SERVER = typeof window === 'undefined';

export const IS_TEST = typeof jest !== 'undefined';

/*
Используется при запросах к API из браузера в dev и prod режимах, а также для CORS в dev и prod режимах
 */
export const APP_PUBLIC_URL = `${process.env.PUBLIC_HTTP_SCHEME}://${process.env.PUBLIC_HTTP_HOST}:${process.env.PUBLIC_NEST_SERVER_PORT}`;

/*
Используется для CORS в dev режиме при отправке запросов на бэкенд из react-testing-library
 */
export const APP_TEST_REACT_TESTING_LIBRARY_URL = 'http://localhost';

export const API_PAGE_PREFIX = '/api/page';
