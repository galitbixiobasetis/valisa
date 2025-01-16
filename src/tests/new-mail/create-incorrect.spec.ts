import { test, expect } from '@playwright/test';
import * as allure from "allure-js-commons";
import { NewMailPage } from '../../page-objects/pages/new-mail-page';
import { SidebarMenuComponent } from '../../page-objects/components/sidebar-menu-component';
import {TestFunctions, getIncorrectMailData } from '../../utils/test-functions';
 

test.beforeEach(async ({ page }) => {
    await TestFunctions.goToUrl(page, '');

    const sidebarMenu = new SidebarMenuComponent(page);
  
    await sidebarMenu.navigateToNewMail();

});

test.describe('create unsusccesfully new mail', () => {
    test('should fail sending a new mail with empty required fields', async ({ page }) => {
     
        const newMailPage = new NewMailPage(page);
  
        await newMailPage.sendNewMail();

        expect(await newMailPage.isErrorIconVisible()).toBeTruthy();
    });

    test('should not send email filling wrong required fields', async ({ page }) => {
        const newMailPage = new NewMailPage(page);
        const incorrectMailData = await getIncorrectMailData();

        const to = incorrectMailData[0].invalidMail.perA.message; 
        const from = incorrectMailData[0].invalidMail.de.message;
        const subject = incorrectMailData[0].invalidMail.assumpte.message;
        const content = incorrectMailData[0].invalidMail.cos.message;
    
        await allure.step('to field | should fill required field with an unregistered mail', async () => {
            await newMailPage.clickToField();
            await newMailPage.fillToField(to);
            await newMailPage.validateToFieldisFilled(to);
        });
    
        await allure.step('from field | should fill required field', async () => {
            await newMailPage.clickFromField();
            await newMailPage.fillFromField(from);
            await newMailPage.validateFromFieldisFilled(from);
         });
    
        await allure.step('subject field | should fill required fields', async () => {
            await newMailPage.clickSubjectField();
            await newMailPage.fillSubjectField(subject);
            await newMailPage.validateSubjectFieldisFilled(subject);
        });
    
        await allure.step('content field | should fill required fields', async () => {
            await newMailPage.clickContentField();
            await newMailPage.fillContentField(content);
            await newMailPage.validateContentFieldisFilled(subject);
    });
         
        await allure.step('click on sending button and fail on sending mail', async () => {
            await newMailPage.sendNewMail();
            await page.waitForLoadState();
            expect(await newMailPage.isErrorIconVisible()).toBeTruthy();
            
        });

        await allure.step('stay at create page (do not redirect to sent page)', async () => {
            await newMailPage.validateURL();  
        });
        
    });
});