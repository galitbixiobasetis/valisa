import test, { expect } from "playwright/test";
import { ReceivedPage } from "../../../page-objects/pages/received-page";
import { mockReceivedValises } from "../../../utils/api/mocks";
import { TestFunctions } from "../../../utils/test-functions";
import * as allure from "allure-js-commons";

test.beforeEach(async ({ page }) => {
    await TestFunctions.goToUrl(page, '');  
});

test('should display valises when API returns data', async ({ page }) => {
    const receivedPage = new ReceivedPage(page);

    await allure.step('given data', async () => {

    await page.route('**/valisa/api/valises/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockReceivedValises),
      });
    });
     
    await receivedPage.clickOnFilterTabAll();
    expect(await receivedPage.getAllMailList()).toBeTruthy();
    });

});