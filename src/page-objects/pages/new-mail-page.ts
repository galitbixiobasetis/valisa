import { expect, type Locator, type Page } from '@playwright/test';
import { NEW_MAIL_URL } from '../../utils/config';
  
export class NewMailPage {
 
   readonly page: Page; 
    readonly toField: Locator;
   readonly toFieldOptions: Locator;  
   readonly visualizersField: Locator;
   readonly fromField: Locator;
   readonly subjectField: Locator;
   readonly contentField: Locator;
   readonly signatureField: Locator;
   readonly sendNewMailButton: Locator;
   readonly saveMailButton: Locator;
   readonly step1: Locator;
   readonly step2: Locator;
   readonly errorIcon: Locator;
   readonly errorInput: Locator;
   readonly chip: Locator;
   readonly newMailTitle:Locator;
  
   constructor(page: Page) {
   this.page = page;
   this.newMailTitle = page.getByRole('heading', { name: 'Nova valisa' })

   this.toField =  page.locator('input#perA'); 
   this.toFieldOptions = page.locator('.MuiAutocomplete-listbox .MuiAutocomplete-option');  
   this.chip = page.getByRole('button', { name: 'Valisa4 Usuari' })

   this.visualizersField = page.getByLabel('Visualitzadors')
   this.visualizersField = page.locator('role=combobox[name="Visualitzadors"]');

   this.fromField = page.getByRole('combobox', { name: 'De *' })

   this.subjectField = page.locator('#assumpte')

   this.contentField = page.locator('#cos')

   this.signatureField = page.getByLabel('Peu signatura')

   this.sendNewMailButton = page.getByRole('button', { name: 'Enviar' })
   this.saveMailButton = page.getByRole('button', { name: 'Desar' })

   this.step1 = page.getByRole('button', { name: 'Formularis' })
   this.step2 = page.getByRole('button', { name: 'Documentació' })

   this.errorIcon = page.locator('[data-testid="WarningIcon"]'); 
   this.errorInput = page.locator('[id="perA-helper-text"]');
   
   }

   async validateURL(){
      await expect(this.page).toHaveURL(NEW_MAIL_URL, { timeout: 10000 });
   }

   async validateNewMailTitle (){
      await expect(this.newMailTitle).toBeVisible
   }

   async clickToField(): Promise<void> {
      await this.toField.click();
   }
   async fillToField(value: string): Promise<void> {
      await this.toField.fill(value);
   } 

   async validateToFieldisFilled(value: string): Promise<void> {
      await expect(this.toField).toHaveValue(value);
   }

   async selectFirstToFieldOption(): Promise<void> {
      await this.toField.click();  
      
      const firstOption = this.toFieldOptions.first();
      await firstOption.click(); 

   }
    async isToFieldChipVisible():  Promise<void> {
        await expect(this.chip).toBeVisible()
    }

    
   async clickVisualizersField(): Promise<void> {
      await this.visualizersField.click();
   }

   async fillVisualizersField(value: string): Promise<void> {
      await this.visualizersField.fill(value);
   }

   
   async clickFromField(): Promise<void> {
      await this.fromField.click();
   }

   async fillFromField(value: string): Promise<void>{
      await this.fromField.fill(value);
   }



   async validateFromFieldisFilled(value: string): Promise<void> {
      await expect(this.fromField).toHaveValue(value);
   }
   async clickSubjectField(): Promise<void> {
      await this.subjectField.click();
   }



   async fillSubjectField(value: string): Promise<void>{
      await this.subjectField.fill(value);
   }

   async validateSubjectFieldisFilled(value: string): Promise<void> {
      await expect(this.subjectField).toHaveValue(value);
   }



   async clickContentField(): Promise<void> {
      await this.contentField.click();
   }

   async fillContentField(value: string): Promise<void> {
      await this.contentField.fill(value);
   }



   async validateContentFieldisFilled(value: string): Promise<void> {
      await expect(this.contentField).toHaveValue(value);
   }
   async clickSignatureField(): Promise<void> {
      await this.signatureField.click();
   }



   async fillSignatureField(value: string): Promise<void> {
      await this.signatureField.fill(value);
   }



   async sendNewMail(): Promise<void> {
      await this.sendNewMailButton.click();
   }

   async saveMail(): Promise<void> {
      await this.saveMailButton.click();
   }



   async goToStep1(): Promise<void> {
      await this.step1.click();
   }

   async goToStep2(): Promise<void> {
      await this.step2.click();
   }

   async isErrorIconVisible(): Promise<boolean> {
      return await this.errorIcon.isVisible();
   }

   async isErrorInputVisible(): Promise<boolean> {
      return await this.errorInput.isVisible();
   }
   
  


}
