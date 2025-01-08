import { expect, type Locator, type Page } from '@playwright/test';
  
export class SidebarMenuComponent {
   readonly page: Page; 
   readonly newMailButton: Locator;
   readonly mailboxButton: Locator;
   readonly sentMailButton: Locator;
   readonly reviewButton: Locator;
   readonly draftButton: Locator;
   readonly delaysButton: Locator;
   readonly highlightedButton: Locator;
   readonly configButton: Locator;
   

   constructor(page: Page) {
   this.page = page;
   this.newMailButton = page.getByLabel('Nova valisa').getByRole('button')
   this.mailboxButton = page.locator('[data-testid="InboxIcon"]');
   this.sentMailButton = page.locator('li[aria-label="Enviades"] div[role="button"]');
   this.reviewButton = page.locator('[data-testid="RateReviewIcon"]');
   this.draftButton = page.locator('[data-testid="DraftsIcon"]');
   this.delaysButton = page.locator('[data-testid="TimerOffIcon"]');
   this.highlightedButton = page.locator('[data-testid="StarIcon"]');
   this.configButton = page.locator('[data-testid="SettingsIcon"]');

   }

   async navigateToNewMail(): Promise<void> {
      await this.newMailButton.click();
      await this.page.waitForLoadState('load');
   }

   async navigateToMailbox(): Promise<void> {
    await this.mailboxButton.click();  
    await this.page.waitForLoadState('load');
 
  }

   async navigateToSentMail(): Promise<void> {
    await this.sentMailButton.click();
    await this.page.waitForLoadState('load');
  }

   async navigateToReview(): Promise<void> {
    await this.reviewButton.click();
    await this.page.waitForLoadState('load');
  }

   async navigateToDraft(): Promise<void> {
    await this.draftButton.click();
    await this.page.waitForLoadState('load');
  }

   async navigateToDelays(): Promise<void> {
    await this.delaysButton.click();
    await this.page.waitForLoadState('load');
  }

   async navigateToHighlighted(): Promise<void> {
    await this.highlightedButton.click();
    await this.page.waitForLoadState('load');
  }

   async navigateToConfig(): Promise<void> {
    await this.configButton.click();
    await this.page.waitForLoadState('load');
  }


}
