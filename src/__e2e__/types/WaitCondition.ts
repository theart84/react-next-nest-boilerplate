import { Browser } from '@e2e/services/Browser';

export type WaitCondition = (browser: Browser) => Promise<boolean>;
