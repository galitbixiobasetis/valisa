import { test, expect } from '@playwright/test';
import * as allure from "allure-js-commons";
import { SidebarMenuComponent } from '../../page-objects/components/sidebar-menu-component';
import {TestFunctions } from '../../utils/test-functions';
import { FileUploadComponent } from '../../page-objects/components/file-upload-component'; 
import { NewMailPage } from '../../page-objects/pages/new-mail-page';
import { testFiles } from '../../utils/interfaces';
 
  
test.beforeEach(async ({ page }) => {
    await TestFunctions.goToUrl(page, '');
    
    const newMailPage = new NewMailPage(page);
    const sidebarMenu = new SidebarMenuComponent(page);
  
    await sidebarMenu.navigateToNewMail();
    
    await newMailPage.goToStep2(); 
});

test('should upload files to email using file chooser', async ({ page }) => {
    const fileUploadPage = new FileUploadComponent(page);
    await fileUploadPage.clickSelectFilesButton();
    await fileUploadPage.fileChooserUpload();

    await allure.step('Verify the uploaded file appears in the file table', async () => {
        await fileUploadPage.validateUploadedFilesTable();
    });

    await allure.step('Ensure the uploaded file name is displayed correctly', async () => {
        await fileUploadPage.validateUploadedFileText('example.png');
    });

    await allure.step('Delete the uploaded file', async () => {
        await fileUploadPage.deleteUploadedFile();
    });
});

test('should upload files using drag and drop', async ({ page }) => {
    const fileUploadPage = new FileUploadComponent(page);

    const testFilePath = testFiles[0].path;

    await fileUploadPage.simulateDragAndDrop(testFilePath);

    await allure.step('Verify the uploaded file appears in the file table', async () => {
        await fileUploadPage.validateUploadedFilesTable();
    });

    await allure.step('Ensure the uploaded file name is displayed correctly', async () => {
        await fileUploadPage.validateUploadedFileText('file');
    });

    await allure.step('Delete the uploaded file', async () => {
        await fileUploadPage.deleteUploadedFile();
        expect( fileUploadPage.uploadedFilesTable).toBeHidden();
    });
});

 