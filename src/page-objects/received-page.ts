import { expect, type Locator, type Page } from '@playwright/test';
import { MailComponent } from './mail-component';
import { MAILBOX_URL } from '../utils/config';

export class ReceivedPage {
 
    readonly page: Page; 
    readonly viwerMode: Locator;
    readonly filterTabs: Locator; 
    readonly filterTabAll: Locator;
    readonly filterTabPending: Locator;
    readonly filterTabArchived: Locator;

    constructor(page: Page) {
        this.page = page;
        this.viwerMode = page.getByLabel('Mostra visualitzador');
        this.filterTabs = page.getByLabel('FilterTabs');
        this.filterTabAll = page.getByRole('button', { name: 'Totes' })
        this.filterTabPending = page.getByRole('button', { name: 'No gestionades' });
        this.filterTabArchived = page.getByRole('button', { name: 'Arxivades' });
        
    }
    async validateURL(){
       await expect(this.page).toHaveURL(MAILBOX_URL, { timeout: 10000 });
    }


    async activateViewerMode(): Promise<boolean> {
        await this.viwerMode.click();
        return await this.isViewerModeActive();
    }
    
    async deactivateViewerMode(): Promise<boolean> {
        await this.viwerMode.click();
        return !(await this.isViewerModeActive());
    }
    
    async isViewerModeActive(): Promise<boolean> {
          return await this.viwerMode.isChecked();
    }

    async getMailList(mailItem:Locator)  {
        await this.page.waitForLoadState('load');  
        const mailComponent = new MailComponent(this.page)
        const getMailList = await mailComponent.mailList.all();

        return getMailList.map((item: Locator) => new MailComponent(this.page));
    }
        
    async clickOnFilterTabAll() {
        await this.filterTabAll.click();
    }

    async getAllMailList(): Promise<MailComponent[]> {
        await this.clickOnFilterTabAll();
        return await this.getMailList(new MailComponent(this.page).mailItem);
    }
        
    async clickOnFilterTabPending() {
        await this.filterTabPending.click();
    }

    async getPendingMaillist() {
        await this.clickOnFilterTabPending();
        return await this.getMailList(new MailComponent(this.page).mailItem);
    }

    async clickOnFilterTabArchived() {
        await this.filterTabArchived.click();
    }

    async getArchivedMailList() {
        await this.clickOnFilterTabArchived();
        return await this.getMailList(new MailComponent(this.page).mailItem);
    }
    
    }
 
