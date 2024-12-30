import { test, expect } from '@playwright/test';
import { RebutsPage } from '../../page-objects/rebuts';
import { MailComponent } from '../../page-objects/mail';
import { TestFunctions } from '../../utils/test-functions';
 

test.beforeEach(async ({ page }) => {
    await TestFunctions.goToUrl(page, '');  
});

test('should navigate to rebuts page', async ({ page }) => {
     expect(page.url()).toContain('/rebuts');  
});
 
test.describe('if user want to be in viewer mode', () => {
    
    test('should activate the viewer mode when clicking on "Mostra visualitzador"', async ({ page }) => {
        const rebutsPage = new RebutsPage(page);
        if (!(await rebutsPage.isViewerModeActive())) {
            await rebutsPage.activateViewerMode();
        } 

        expect(await rebutsPage.isViewerModeActive()).toBeTruthy();
        
     });

    test('should show the visibility icon when the viewer mode is active', async ({ page }) => {
        const rebutsPage = new RebutsPage(page);
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
 
    test('should deactivate the viewer mode when clicking on "Mostra visualitzador"', async ({ page }) => {
        const rebutsPage = new RebutsPage(page);

        await rebutsPage.activateViewerMode();

        await rebutsPage.deactivateViewerMode();
        
        expect(await rebutsPage.activateViewerMode()).toBeFalsy();
     });
 })

