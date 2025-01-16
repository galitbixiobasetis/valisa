import test, { expect } from "playwright/test";
import { ReceivedPage } from "../../../page-objects/pages/received-page";
import {  mockEmptyValises } from "../../../utils/api/mocks";
import { TestFunctions } from "../../../utils/test-functions";
import * as allure from "allure-js-commons";

test.beforeEach(async ({ page }) => {
    await TestFunctions.goToUrl(page, '');  
});

test('should display no valises when API returns no data', async ({ page }) => {
  const receivedPage = new ReceivedPage(page);
  await page.route('**/valisa/api/valises/**', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockEmptyValises),
    });
  });
    await allure.step('verify empty state', async () => {
     await page.waitForResponse(response => 
      response.url().includes('/valisa/api/valises/5020502?&size=10&page=0&totalPages=0&totalItems=0&safat') && response.status() === 200
    );
 
     expect(await receivedPage.validateEmptyMailbox());
    });
});
