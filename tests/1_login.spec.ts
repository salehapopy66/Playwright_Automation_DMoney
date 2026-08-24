import { test } from '@playwright/test';
import { mkdirSync, unlinkSync, existsSync } from 'fs';
import { LoginPage } from '../pages/login.pom';
import { dirname } from 'path';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe.configure({ retries: 2 });

test("Agent login",async({page, request})=>{
    const authPath = 'auth.json';
    
    if (existsSync(authPath)) {
        unlinkSync(authPath);
        console.log(`✓ Removed existing auth.json for fresh login`);
    }

    const loginPage = new LoginPage(page);
    await loginPage.visitPage("/login");

    await loginPage.loginWithOtp("salehapopy29+4@gmail.com", "1234", request);

    try {
        mkdirSync(dirname(authPath), { recursive: true });
        await page.context().storageState({ path: authPath });
        console.log(`✓ Authentication state saved to ${authPath}`);
    } catch (error) {
        console.error(`✗ Failed to save auth.json: ${error}`);
        throw error;
    }

})