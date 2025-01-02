import { expect, type Locator, type Page } from '@playwright/test';
  
export class SidebarMenuComponent {
   readonly page: Page; 
   readonly newMailButton: Locator;
   readonly mailboxButton: Locator;
 

   constructor(page: Page) {
   this.page = page;
   this.newMailButton = page.getByLabel('Nova valisa').getByRole('button')
   this.mailboxButton = page.locator('[data-testid="InboxIcon"]');
   
   }

   async navigateToNewMail(): Promise<void> {
      await this.newMailButton.click();
      await this.page.waitForLoadState('load');
   }

   async navigateToMailbox(): Promise<void> {
    await this.mailboxButton.click();  
    await this.page.waitForLoadState('load');
 
  }
}
