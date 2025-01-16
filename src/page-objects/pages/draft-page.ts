import { expect, type Locator, type Page } from '@playwright/test';
 import {  DRAFT_MAIL_URL } from '../../utils/config';

export class DraftPage {
 
    readonly page: Page; 
    readonly draftTitle: Locator;
 
    constructor(page: Page) {
        this.page = page;    
        this.draftTitle = page.getByRole('heading', { name: 'Esborranys' })
    }
 
    async validateDraftTitle (){
    await expect(this.draftTitle).toBeVisible()
    }

    async validateURL(){
       await expect(this.page).toHaveURL(DRAFT_MAIL_URL, { timeout: 10000 });
    }
}
