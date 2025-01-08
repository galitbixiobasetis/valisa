import { Page } from '@playwright/test'; 
import * as fs from 'fs';
import * as path from 'path';

export class TestFunctions {
  static async goToUrl(page: Page, path: string = '/'): Promise<number> {
     let responseStatus: number | undefined;

     const responsePromise = new Promise<void>((resolve, reject) => {
        page.on('response', (response) => {
            if (response.url().includes(path)) {
                responseStatus = response.status();
                resolve();  
            }
        });

        page.on('requestfailed', reject);  
    });

     await page.goto(path);

     await responsePromise;

     if (responseStatus === undefined) {
        throw new Error(`invalid request to URL: ${path}`);
    }

    return responseStatus;
}
  

}

export interface ValidMail {
  assumpte: { message: string };
  de: { message: string };
  cos: { message: string };
  perA: { message: string };
 }
 
 export interface CorrectMailData {
  validMail: ValidMail;
 }
 
 export async function getCorrectMailData(): Promise<CorrectMailData[]> {
  const filePath = path.resolve(__dirname, './data/correct-mail-data.json');
  const rawData = await fs.promises.readFile(filePath, 'utf-8');
  return JSON.parse(rawData);  
 }

export interface InvalidMail {
 assumpte: { message: string };
 visualitadors: { message: string };
 de: { message: string };
 cos: { message: string };
 perA: { message: string };
}

export interface IncorrectMailData {
 invalidMail: InvalidMail;
}

export async function getIncorrectMailData(): Promise<IncorrectMailData[]> {
 const filePath = path.resolve(__dirname, './data/incorrect-mail-data.json');
 const rawData = await fs.promises.readFile(filePath, 'utf-8');
 return JSON.parse(rawData);  
}



  