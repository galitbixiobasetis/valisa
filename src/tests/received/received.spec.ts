import { test, expect } from '@playwright/test';
import { ReceivedPage } from '../../page-objects/pages/received-page';
import { MailComponent } from '../../page-objects/components/mail-component';
import { TestFunctions } from '../../utils/test-functions';
import { BASE_URL, LANDING_PAGE } from '../../utils/config';
import * as allure from "allure-js-commons";
 
 
test.beforeEach(async ({ page }) => {
    await TestFunctions.goToUrl(page, '');  
});

test.describe('Mailbox navigation', () => {

    test('should show error when accessing a maibox by URL directly', async ({ page }) => {
        const responseStatus = await TestFunctions.goToUrl(page, BASE_URL);
        expect(responseStatus).toBe(404); 
        });
      
    test('should redirect to mailbox when accessing landing page', async ({ page }) => {
        const receivedPage = new ReceivedPage(page);

         await page.goto(LANDING_PAGE);

         await page.waitForLoadState();  
         await receivedPage.validateURL();
         });


        test ('Mailbox tabs functionality', async ({ page }) => { 
            const receivedPage = new ReceivedPage(page);
            await allure.step('should list all mails in "All" tab or show empty state', async () => {
                await receivedPage.clickOnFilterTabAll();
                expect (await receivedPage.getAllMailList()).toBeTruthy();
            });
            await allure.step('should display only unmanaged emails in the "No gestionados" tab', async () => {
                await receivedPage.clickOnFilterTabPending();
                expect (await receivedPage.getPendingMaillist()).toBeTruthy();      
            });
            await allure.step('should display archived emails in the "Archivados" tab', async () => {
                await receivedPage.clickOnFilterTabArchived();
                expect (await receivedPage.getArchivedMailList()).toBeTruthy();      
            });
        });
});

test('Viewer Mode Functionality', async ({ page }) => {

    const receivedPage = new ReceivedPage(page);
    const mail = new MailComponent(page);

    await allure.step('should activate the viewer mode when clicking on "Mostra visualitzador"', async () => {

        if (!(await receivedPage.isViewerModeActive())) {
            await receivedPage.activateViewerMode();
        } 

        expect(await receivedPage.isViewerModeActive()).toBeTruthy();
        
    });

    await allure.step('should show the visibility icon when the viewer mode is active', async () => {
    
        if (!(await receivedPage.isViewerModeActive())) {
            await receivedPage.activateViewerMode();
        }
    
        const mailContainers = await receivedPage.getMailList(mail.mailItem);
    
        if (mailContainers.length > 0) {
            console.log('get mail list:', mail.mailItem);
            console.log('We found', mailContainers.length, 'emails.');
            
        const viewerMailComponents = mailContainers.filter(mailComponent => mailComponent.isMailForViewerVisible());

        for (const viewerMailComponent of viewerMailComponents) {
            await expect(viewerMailComponent.visibilityIcon.first()).toBeVisible(); 
        }

        } else {
            console.log('No emails were found for viewer mode.');
        }
    });
   
    await allure.step('should deactivate susccesfully viewer mode when clicking on "Mostra visualitzador"', async () => {
 
        await receivedPage.activateViewerMode();
    
        await receivedPage.deactivateViewerMode();
        
        expect(await receivedPage.activateViewerMode()).toBeFalsy();
     });
})

