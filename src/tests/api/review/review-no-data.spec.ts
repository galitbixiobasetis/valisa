import test, { expect } from "playwright/test";
import { ReviewPage } from "../../../page-objects/pages/to-review-page";
import { mockEmptyValises } from "../../../utils/api/mocks";
import { SidebarMenuComponent } from "../../../page-objects/components/sidebar-menu-component";
import { TestFunctions } from "../../../utils/test-functions";
import * as allure from "allure-js-commons";

test.beforeEach(async ({ page }) => {
  const sidebarMenuComponent = new SidebarMenuComponent(page);
  
    await TestFunctions.goToUrl(page, '');
    await sidebarMenuComponent.navigateToReview();  
    
});
test('should display no valises when API returns no data', async ({ page }) => {
  const reviewPage = new ReviewPage(page);

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
 
    //  expect(await reviewPage.validateEmptyMailbox());
    });
});
