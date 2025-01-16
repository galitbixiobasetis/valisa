import { expect, type Locator, type Page } from '@playwright/test';
 import { SENT_MAIL_URL } from '../../utils/config';
import { MailComponent } from '../components/mail-component';
 
export class SentMailPage {
 
    readonly page: Page; 
    readonly sentMailTitle : Locator;

    constructor(page: Page) {
        this.page = page;   
        this.sentMailTitle = page.getByRole('heading', { name: 'Enviades' })

    }

    async validateURL(){
       await expect(this.page).toHaveURL(SENT_MAIL_URL, { timeout: 10000 });
    }

    async validateSentMailTitle (){
        await expect(this.sentMailTitle).toBeVisible()
    }
   
        
//      async validateSentMailList() {
//         const mail = new MailComponent(this.page);

//          const mailContainers = await this.getMailList(this.page);
    
//         if (mailContainers.length > 0) {
//             console.log('get mail list:', mail.mailItem);
//             console.log('We found', mailContainers.length, 'emails.');}
            
      
//     }; 
//     async getMailList(page: Page) {
  
//         const mailComponent = new MailComponent(page);
//        const mailList = await mailComponent.mailList.all();
   
//         return mailList.map((item: Locator) => new MailComponent(page));
//    }
    } 
           


