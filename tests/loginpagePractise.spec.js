const { test, expect } = require('@playwright/test');

test('Login to Rahul Shetty Academy practise site', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('input#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator("[name='signin']").click();

    await expect(page).toHaveURL(/angularpractice\/shop/);
});
