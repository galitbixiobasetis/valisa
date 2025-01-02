import { test, expect } from '@playwright/test';
import { NewMailPage } from '../../page-objects/new-mail-page';
import { SidebarMenuComponent } from '../../page-objects/sidebar-menu-component';
import {TestFunctions, getIncorrectMailData } from '../../utils/test-functions';
 

test.beforeEach(async ({ page }) => {
    await TestFunctions.goToUrl(page, '');

    const sidebarMenu = new SidebarMenuComponent(page);
  
    await sidebarMenu.navigateToNewMail();

});

test.describe('create unsusccesfully new mail', () => {
    test('should fail when sending a new mail without filling required fields', async ({ page }) => {
        const newMailPage = new NewMailPage(page);
 
        await newMailPage.sendNewMail();

    });

    test('should show error on step 1 when sending a new mail without filling required fields', async ({ page }) => {
        const newMailPage = new NewMailPage(page);
  
        await newMailPage.sendNewMail();

        expect(await newMailPage.isErrorIconVisible()).toBeTruthy();
    }
    );

    test('should show error on "for" field when sending a new mail without filling required fields', async ({ page }) => {
        const newMailPage = new NewMailPage(page);
        const incorrectMailData = await getIncorrectMailData();
        const perA = incorrectMailData[0].invalidMail.perA.message; // 
 
        await newMailPage.clickToField();
        await newMailPage.fillToField(perA);   

        
        await newMailPage.sendNewMail();

        expect(await newMailPage.isErrorInputVisible());
    }
    );
 
    test('should show error on "from" field when sending a new mail without filling required fields', async ({ page }) => {
        const newMailPage = new NewMailPage(page);
        const incorrectMailData = await getIncorrectMailData();
        const de = incorrectMailData[0].invalidMail.de.message;  

        await newMailPage.clickFromField();
        await newMailPage.fillFromField(de);

        await newMailPage.sendNewMail();

        expect(await newMailPage.isErrorInputVisible());
    });

    test('should show error on "subject" field when sending a new mail without filling required fields', async ({ page }) => {
        const newMailPage = new NewMailPage(page);
        const incorrectMailData = await getIncorrectMailData();
        const assumpte = incorrectMailData[0].invalidMail.assumpte.message; 

        await newMailPage.clickSubjectField();
        await newMailPage.fillSubjectField(assumpte);

        await newMailPage.sendNewMail();

        expect(await newMailPage.isErrorInputVisible());
    });
    test('should show error on "content" field when sending a new mail without filling required fields', async ({ page }) => {
        const newMailPage = new NewMailPage(page);
        const incorrectMailData = await getIncorrectMailData();
        const content = incorrectMailData[0].invalidMail.cos.message; 

        await newMailPage.clickContentField();
        await newMailPage.fillContentField(content);

        await newMailPage.sendNewMail();

        expect(await newMailPage.isErrorInputVisible());
    }
    );

});
