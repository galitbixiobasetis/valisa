import { expect, type Locator, type Page } from '@playwright/test';
 import {  DELAYS_MAIL_URL } from '../../utils/config';

export class DelaysPage {
 
    readonly page: Page; 
    readonly unreadTitle: Locator;
 
    constructor(page: Page) {
        this.page = page;    
        this.unreadTitle = page.getByRole('heading', { name: 'No llegides en termini'})
    }
 
    async validateDelaysTitle (){
    await expect(this.unreadTitle).toBeVisible()
    }

    async validateURL(){
       await expect(this.page).toHaveURL(DELAYS_MAIL_URL, { timeout: 10000 });
    }
}
