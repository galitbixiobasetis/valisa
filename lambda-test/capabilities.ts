import dotenv from 'dotenv';
 
dotenv.config();

export const capabilities = {
    browserName: 'chromium',  
    browserVersion: 'latest',
    'LT:Options': {
      browserName: 'Chrome',  
      platform: 'Windows 10',
      build: 'Playwright Tests',
      name: 'LambdaTest Playwright Tests',
      user: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY,
      network: true,
      video: true,
      console: true,
    },
};