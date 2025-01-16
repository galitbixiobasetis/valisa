import { expect, type Locator, type Page } from '@playwright/test';
 import path from 'path';

export class FileUploadComponent {
    readonly page: Page;
    readonly dragAndDropArea: Locator;
    readonly selectFilesButton: Locator;
    readonly fileInput: Locator;
    readonly uploadedFilesTable: Locator;
    readonly deleteFileButton: Locator;
 
    constructor(page: Page) {
    this.page = page;
    this.dragAndDropArea = page.getByText('Sel·lecciona arxiusO') 
    this.selectFilesButton = page.getByRole('button', { name: 'Sel·lecciona arxius' })
    this.fileInput = page.locator('input[type="file"]');
    this.uploadedFilesTable = page.locator('.css-ftb5bl');
    this.deleteFileButton = page.locator('[data-testid="DeleteOutlineIcon"]');
    }
    async clickSelectFilesButton() {
        await expect(this.selectFilesButton).toBeVisible();
        await expect(this.selectFilesButton).toBeEnabled();
        await this.selectFilesButton.click();
    }
     
    async fileChooserUpload() {
         const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            await this.clickSelectFilesButton()
         ]);

        await fileChooser.setFiles(path.resolve(__dirname, '../../utils/data/example.png')); 
        expect(fileChooser).not.toBeNull();
        await this.page.keyboard.press('Escape');
       

    } 
      
    async validateUploadedFilesTable() {
        await expect(this.uploadedFilesTable).toBeVisible();
    }

     async validateUploadedFileText(text: string) {
        const uploadedFileText = await this.uploadedFilesTable.textContent();
        expect(uploadedFileText).toContain(text);
    }

    async simulateDragAndDrop(filePath: string) {
        const dataTransfer = await this.page.evaluateHandle(() => new DataTransfer());
        
         await this.page.evaluate(({ data, filePath }) => {
            const file = new File([''], filePath.split('/').pop()!, { type: 'image/png' }); 
            data.items.add(file);
        }, { data: dataTransfer, filePath });
    
        await this.dragAndDropArea.dispatchEvent('dragenter', { dataTransfer });
        await this.dragAndDropArea.dispatchEvent('drop', { dataTransfer });
    }

    async deleteUploadedFile():Promise<boolean> {
        await this.deleteFileButton.click();
        return true;
    }
 
}

 
 