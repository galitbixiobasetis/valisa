import { expect, type Locator, type Page } from '@playwright/test';
 
export class MailComponent {
   readonly page: Page; 
   readonly mailList: Locator;
   readonly mailCheckbox: Locator; 
   readonly mailFavoriteCheckbox: Locator;
   readonly recipientLabel: Locator;
   readonly remitentLabel: Locator;
   readonly visibilityIcon: Locator;
   readonly mailItem: Locator;
  
   constructor(page: Page) {
   this.page = page;
   this.mailList = page.locator('div:nth-child(5) > div > div > div ');
   this.mailCheckbox = page.getByRole('checkbox').first()
   this.mailFavoriteCheckbox = page.getByRole('checkbox').nth(1)
   this.recipientLabel = page.getByLabel('De:Valisa1 Usuari Proves')
   this.remitentLabel = page.getByLabel('De:Valisa1 Usuari Proves')
   this.visibilityIcon = page.locator('[data-testid="VisibilityIcon"]');
   this.mailItem =  page.locator('.css-19b90io');
   }

   async isMailVisible(): Promise<boolean> {
      return await this.mailItem.isVisible();  
   }

   async isMailForViewerVisible(): Promise<boolean> {
      return await this.visibilityIcon.isVisible();
    }
 
   async clickOnMailCheckbox() {
      await this.mailCheckbox.click();
   }

   async clickOnMailFavoriteCheckbox() {
      await this.mailFavoriteCheckbox.click();
   }

   async getRecipientLabel() {
      return await this.recipientLabel.textContent();
   }

   async getRemitentLabel() {
      return await this.remitentLabel.textContent();
   }
}
