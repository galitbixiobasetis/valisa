// import { expect, type Locator, type Page } from '@playwright/test';
 
// export class loginPage {
//     readonly page: Page;

//     // gral 
//     readonly loginEmailInput: Locator;
//     readonly inputTextElement: Locator;
//     readonly timelineNumber: Locator;
//     readonly continueButtonStep1: Locator;
//     readonly continueButtonStep2: Locator;
//     readonly continueButtonStep3: Locator;
//     readonly conttinueButtonStep4: Locator;
//     readonly continueLoginButton: Locator;
//     readonly alertMessage: Locator;
//     readonly alertErrorMessage: Locator;
 

    
//     // step 1
//     readonly continueButton: Locator;
//     readonly inputWraper: Locator;
//     readonly checkTerms: Locator;
    
//     // step 2
//     readonly paswordVisibility: Locator;
//     readonly registerPasswordText: Locator;
//     readonly loginPasswordText: Locator;

//     // step 3
//     readonly birthday: Locator;

//     // step 4
//     readonly buttonJoinNewsletter: Locator;

//     constructor(page: Page) {
//         this.page = page;
//         this.continueButton = page.getByTestId('webeat-login-form').getByTestId('buttonElement')
//         this.continueButtonStep1 = page.getByTestId('button-step-1')
//         this.continueButtonStep2 = page.getByTestId('button-step-2')
//         this.continueButtonStep3 = page.getByTestId('button-step-3')
//         this.conttinueButtonStep4 = page.getByTestId('button-step-4')
//         this.inputWraper = page.getByTestId('InputWrapper')
//         this.loginEmailInput = page.getByTestId('login-form-email')
//         this.inputTextElement = page.getByTestId('inputTextElement')
//         this.checkTerms = page.getByTestId('checkboxControlElement')

//         this.timelineNumber = page.getByTestId('stepElement') // .first() .nth(1)
//         this.paswordVisibility = page.getByTestId('passwordVisibility')
//         this.registerPasswordText = page.getByTestId('webeat-register-form-password-step')
//         this.loginPasswordText = page.getByTestId('login-form-password')
//         this.birthday = page.getByTestId('webeat-register-form-birthday-step')
//         this.buttonJoinNewsletter = page.getByTestId('webeat-register-form-newsletter-step')
//         this.continueLoginButton = page.getByTestId('webeat-login-form').getByTestId('buttonElement')
//         this.alertMessage = page.getByTestId('alertGeneratorElement').getByTestId('paragraphElement')
//         this.alertErrorMessage = page.getByTestId('inputFeedbackElement')
        
     
//     }     

//      async fillEmail(email: string) : Promise<void> {
//         await this.loginEmailInput.fill(email);
//     }
//      async clickContinue() : Promise<void> {
//         await this.continueButton.click();
//     }
//      async clickContinueStep1() : Promise<void> {
//         await this.continueButtonStep1.click();
//     }
//      async clickContinueStep2() : Promise<void> {
//         await this.continueButtonStep2.click();
//     }   
//      async clickContinueStep3() : Promise<void> {
//         await this.continueButtonStep3.click();
//     }
//      async clickContinueStep4() : Promise<void> {
//         await this.conttinueButtonStep4.click();
//     }
//      async clickContinueLogin() : Promise<void> {
//         await this.continueLoginButton.click();
//     }
//      async checkTermsAndConditions() : Promise<void> {
//         await this.checkTerms.click();
//     }
//      async checkPasswordVisibility() : Promise<void> {
//         await this.paswordVisibility.click();
//     }
//      async fillPassword(password: string) : Promise<void> {
//         await this.loginPasswordText.fill(password);
//     }
//      async fillRegisterPassword(password: string) : Promise<void> {
//         await this.registerPasswordText.fill(password);
//     }
//     async fillBirthday(birthday: string) : Promise<void> {
//         await this.birthday.fill(birthday);
//     }
//     async clickJoinNewsletter() : Promise<void> {
//         await this.buttonJoinNewsletter.click();
//     }
 
//     async isAlertMessageVisible(): Promise<boolean> {
//         return await this.alertMessage.isVisible();
//     }
//     async isAlertErrorMessageVisible(): Promise<boolean> {
//         return await this.alertErrorMessage.isVisible();
//     }

// }
