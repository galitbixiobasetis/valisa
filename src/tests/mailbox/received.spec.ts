import { test, expect } from '@playwright/test';
import { ReceivedPage } from '../../page-objects/received-page';
import { MailComponent } from '../../page-objects/mail-component';
import { TestFunctions } from '../../utils/test-functions';
import { SidebarMenuComponent } from '../../page-objects/sidebar-menu-component';
import { BASE_URL, LANDING_PAGE, MAILBOX_URL } from '../../utils/config';

 
test.beforeEach(async ({ page }) => {
    await TestFunctions.goToUrl(page, '');  
});

test.describe('Mailbox navigation', () => {

    test('should navigate through the lateral menu to mailbox', async ({ page }) => {
        const rebutsPage = new ReceivedPage(page);
        const sidebarMenu = new SidebarMenuComponent(page);

        await sidebarMenu.navigateToMailbox();

        await rebutsPage.validateURL();
    });

    test('should show error when accessing a maibox by URL directly', async ({ page }) => {
        const responseStatus = await TestFunctions.goToUrl(page, BASE_URL);
        expect(responseStatus).toBe(404); 
        });
      
      test('should redirect to mailbox when accessing landing page', async ({ page }) => {
        const rebutsPage = new ReceivedPage(page);

         await page.goto(LANDING_PAGE);

         await page.waitForLoadState();  
         await rebutsPage.validateURL();
         });
});

test.describe('Mailbox tabs functionality', () => {
    test('should list all mails in "All" tab or show empty state', async ({ page }) => {
        const rebutsPage = new ReceivedPage(page);
        await rebutsPage.clickOnFilterTabAll();
        expect (await rebutsPage.getAllMailList()).toBeTruthy();
    });

    test('should display only unmanaged emails in the "No gestionados" tab', async ({ page }) => { 
        const rebutsPage = new ReceivedPage(page);
        await rebutsPage.clickOnFilterTabPending();
        expect (await rebutsPage.getPendingMaillist()).toBeTruthy();      
     });
    
    test('should display archived emails in the "Archivados" tab', async ({ page }) => { 
        const rebutsPage = new ReceivedPage(page);
        await rebutsPage.clickOnFilterTabArchived();
        expect (await rebutsPage.getArchivedMailList()).toBeTruthy();      

        
     });
  });
 
test.describe('Viewer Mode Functionality', () => {
    
    test('should activate the viewer mode when clicking on "Mostra visualitzador"', async ({ page }) => {
        const rebutsPage = new ReceivedPage(page);
        if (!(await rebutsPage.isViewerModeActive())) {
            await rebutsPage.activateViewerMode();
        } 

        expect(await rebutsPage.isViewerModeActive()).toBeTruthy();
        
     });

    test('should show the visibility icon when the viewer mode is active', async ({ page }) => {
        const rebutsPage = new ReceivedPage(page);
        const mail = new MailComponent(page);
    
        if (!(await rebutsPage.isViewerModeActive())) {
            await rebutsPage.activateViewerMode();
        }
    
        const mailContainers = await rebutsPage.getMailList(mail.mailItem);
    
        if (mailContainers.length > 0) {
            console.log('get mail list:', mail.mailItem);
            console.log('We found', mailContainers.length, 'emails.');
            
        const viewerMailComponents = mailContainers.filter(mailComponent => mailComponent.isMailForViewerVisible());

        for (const viewerMailComponent of viewerMailComponents) {
            await expect(viewerMailComponent.visibilityIcon).toBeVisible();
        }

        } else {
            console.log('No emails were found for viewer mode.');
        }
    });
 
    test('should deactivate susccesfully viewer mode when clicking on "Mostra visualitzador"', async ({ page }) => {
        const rebutsPage = new ReceivedPage(page);
    
        await rebutsPage.activateViewerMode();
    
        await rebutsPage.deactivateViewerMode();
        
        expect(await rebutsPage.activateViewerMode()).toBeFalsy();
     });
})

