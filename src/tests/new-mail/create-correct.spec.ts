import { test, expect, request } from '@playwright/test';
import * as allure from "allure-js-commons";
import { NewMailPage } from '../../page-objects/pages/new-mail-page';
import { SidebarMenuComponent } from '../../page-objects/components/sidebar-menu-component';
import {TestFunctions, getCorrectMailData } from '../../utils/test-functions';
import { SentMailPage } from '../../page-objects/pages/sent-mail-page'; 
import {   LANDING_PAGE } from '../../utils/config';
  

test.beforeEach(async ({ page }) => {
    await TestFunctions.goToUrl(page, '');

    const sidebarMenu = new SidebarMenuComponent(page);
  
    await sidebarMenu.navigateToNewMail();

});
 
test.describe('create successfully new mail', () => {

test('should send email after filling required fields', async ({ page }) => {
    const newMailPage = new NewMailPage(page);
    const sentMailPage = new SentMailPage(page);

    const correctMailData = await getCorrectMailData();
    
    const from = correctMailData[0].validMail.de.message;
    const subject = correctMailData[0].validMail.assumpte.message;
    const content = correctMailData[0].validMail.cos.message;

    await allure.step('to field | should select required field', async () => {
        await newMailPage.selectFirstToFieldOption();
 
        await newMailPage.isToFieldChipVisible()
    });

    await allure.step('from field | should fill required field', async () => {
        await newMailPage.clickFromField();
        const fromField = await newMailPage.fillFromField(from);

        expect(fromField).not.toBe('');
        await newMailPage.isToFieldChipVisible()

    });

    await allure.step('subject field | should select required fields', async () => {
        await newMailPage.clickSubjectField();
        const subjectField = await newMailPage.fillSubjectField(subject);
        expect(subjectField).not.toBe('ssss');

     });

    await allure.step('content field | should fill required fields', async () => {
       const contentField = await newMailPage.fillContentField(content);
        expect(contentField).not.toBe('');

     });

    await allure.step('intercept and validate API response status', async () => {

    let apiResponseStatus: number |  undefined;
    
    await page.route(`${LANDING_PAGE}/api/valises/enviar`, (route) => {
        route.continue();
    });

    const [response] = await Promise.all([
        page.waitForResponse((res) => res.url().includes('/api/valises/enviar') && res.request().method() === 'PUT'),
        newMailPage.sendNewMail(),
    ]);

    apiResponseStatus = response.status();
    console.log('API Response Status:', apiResponseStatus);
  
         
    expect(apiResponseStatus).toBe(201);
   
    });

    await allure.step('validate redirection to sent mail page', async () => {
   
        await sentMailPage.validateURL(); 
    });
    
 
});
});
