import {test, expect} from "@playwright/test";
import { LoginPage } from "../pages/login.pom";
import { BalanceAssertionPage } from "../pages/balanceAssertion.pom";
import { DepositCustomer } from "../pages/depositCustomer.pom";
import fs from "fs";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Agent Balance check - Deposit Customer", () => {
 test("Agent Balance should be 2000 TK and Deposit Customer", async({page, request}) => {

    const agentData = JSON.parse(
          fs.readFileSync(
            "test-data/agent.json",
            "utf8"
          )
        );
    
        const agentEmail = agentData.eMail;
        const agentPhone = agentData.phoneNumber;
        console.log("Agent Email:",agentEmail);

    const agentloginPage = new LoginPage(page);
    const balanceAssertPage = new BalanceAssertionPage(page);
    const depositPage = new DepositCustomer(page);

    await agentloginPage.visitPage("/login");
    await agentloginPage.loginWithOtp(agentEmail, "1234", request);
    await expect(page).toHaveURL(/profile/);

    await balanceAssertPage.openStatement();

    await balanceAssertPage.verifyCurrentBalance(2000);
    
    await depositPage.openDepositPage();
    await depositPage.depositeCustomer("01734567201", 500);

    //await depositPage.verifySuccessMessage();


})
})