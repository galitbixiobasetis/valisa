import { expect, type Locator, type Page } from '@playwright/test';
 import { CONFIG_URL } from '../../utils/config';

export class ConfigPage {
 
    readonly page: Page; 
    readonly configTitle: Locator;
 
    constructor(page: Page) {
        this.page = page;    
        this.configTitle = page.getByRole('heading', { name: 'Configuració' })
    }
 
    async validateConfiglTitle (){
    await expect(this.configTitle).toBeVisible()
    }

    async validateURL(){
       await expect(this.page).toHaveURL(CONFIG_URL, { timeout: 10000 });
    }
}
