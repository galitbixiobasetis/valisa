import { test, expect } from '@playwright/test';
import { NewMailPage } from '../../page-objects/new-mail-page';
import { SidebarMenuComponent } from '../../page-objects/sidebar-menu-component';
import {TestFunctions, getCorrectMailData } from '../../utils/test-functions';
import { SENT_MAIL_URL } from '../../utils/config';
 

test.beforeEach(async ({ page }) => {
    await TestFunctions.goToUrl(page, '');

    const sidebarMenu = new SidebarMenuComponent(page);
  
    await sidebarMenu.navigateToNewMail();

});

test.describe('create successfully new mail', () => {
    test('should pass filling required fields', async ({ page }) => {
        const newMailPage = new NewMailPage(page);
        const correctMailData = await getCorrectMailData();
        const to = correctMailData[0].validMail.perA.message; 
        const from = correctMailData[0].validMail.de.message;
        const subject = correctMailData[0].validMail.assumpte.message;
        const content = correctMailData[0].validMail.cos.message;

 
        await newMailPage.clickToField();
        await newMailPage.fillToField(to);   

        if (await newMailPage.isErrorInputVisible()) {
            console.log('message should explain this error and not  "this field is required"');
        }

        await newMailPage.clickFromField();
        await newMailPage.fillFromField(from);

        await newMailPage.clickSubjectField();
        await newMailPage.fillSubjectField(subject);

        await newMailPage.clickContentField();
        await newMailPage.fillContentField(content);

        
        await newMailPage.sendNewMail();

        await expect(page.url()).toBe(SENT_MAIL_URL);
 
        await newMailPage.sendNewMail();

    });
});