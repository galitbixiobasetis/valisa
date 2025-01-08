import { expect, type Locator, type Page } from '@playwright/test';
 import {  HIGHLIGHTED_MAIL_URL } from '../../utils/config';

export class HighlightedPage {
 
    readonly page: Page; 
    readonly highlightedTitle: Locator;
 
    constructor(page: Page) {
        this.page = page;    
        this.highlightedTitle = page.getByRole('heading', { name: 'Destacades' })
    }
 
    async validateHighlightedTitle (){
    await expect(this.highlightedTitle).toBeVisible()
    }

    async validateURL(){
       await expect(this.page).toHaveURL(HIGHLIGHTED_MAIL_URL, { timeout: 10000 });
    }
    

}
