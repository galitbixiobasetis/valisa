import test, { expect } from "playwright/test";
import { ReviewPage } from "../../../page-objects/pages/to-review-page";
import { mockReceivedValises } from "../../../utils/api/mocks";
import { SidebarMenuComponent } from "../../../page-objects/components/sidebar-menu-component";
import { TestFunctions } from "../../../utils/test-functions";
import * as allure from "allure-js-commons";

test.beforeEach(async ({ page }) => {
  const sidebarMenuComponent = new SidebarMenuComponent(page);
  
    await TestFunctions.goToUrl(page, '');
    await sidebarMenuComponent.navigateToReview();  
    
});

test('should display valises when API returns data', async ({ page }) => {
    const reviewPage = new ReviewPage(page);

    await allure.step('given data', async () => {

    await page.route('**/valisa/api/valises/**', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockReceivedValises),
      });
    });
     
    // await receivedPage.clickOnFilterTabAll();
    // expect(await receivedPage.getAllMailList()).toBeTruthy();
    });

});