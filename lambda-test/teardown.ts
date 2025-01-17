import { Page, Browser } from 'playwright';

 
export const teardownLambdaTest = async (
  page: Page,
  browser: Browser,
  testStatus: 'passed' | 'failed',
  remark: string

): Promise<void> => {
  try {
     await page.evaluate(
      ({ status, comment }) => {
        const action = {
          action: 'setTestStatus',
          arguments: {
            status,
            remark: comment,
          },
        };
        window.eval(`lambdatest_action: ${JSON.stringify(action)}`);
      },
      { status: testStatus, comment: remark }
    );

  } catch (error) {
    console.error('Error testing  LambdaTest:', error);
    
  } finally {
     await browser.close();
  }
};