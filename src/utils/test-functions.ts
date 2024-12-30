import { Page } from '@playwright/test'; 
 
export class TestFunctions {
  static async goToUrl(page: Page, path: string = '/') {
    await page.goto(path);  
  }
}