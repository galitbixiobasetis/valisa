import { test, expect } from '@playwright/test';
 
test('should navigate to rebuts page', async ({ page }) => {
    await page.goto('');
    expect(page.url()).toBe('http://10.120.3.120:8085/valisa/rebuts');
});
 