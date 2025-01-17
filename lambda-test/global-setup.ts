import { chromium, Browser } from 'playwright';
import { capabilities } from '../lambda-test/capabilities';

 
export const setupBrowser = async (): Promise<Browser> => {
    const browser = await chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
        JSON.stringify(capabilities)
      )}`,
    });
    return browser;
  };