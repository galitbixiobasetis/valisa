import { expect, type Locator, type Page } from '@playwright/test';
 import {   REVIEW_MAIL_URL } from '../../utils/config';

export class ReviewPage {
 
    readonly page: Page; 
    readonly reviewTitle: Locator;
 
    constructor(page: Page) {
        this.page = page;    
        this.reviewTitle = page.getByRole('heading', { name: 'Per a vist i plau' })
    }
 
    async validateReviewTitle (){
    await expect(this.reviewTitle).toBeVisible()
    }
    async validateURL(){
       await expect(this.page).toHaveURL(REVIEW_MAIL_URL, { timeout: 10000 });
    }
}
