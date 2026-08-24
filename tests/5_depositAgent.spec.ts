import {test} from "@playwright/test";
import { DepositAgent } from "../pages/depositAgent.pom";
import fs from "fs";
import { LoginPage } from "../pages/login.pom";

test.use({ storageState: { cookies: [], origins: [] } });

test("System deposits 2000 Tk to activated agent", async({ page })=>{

    const agentData = JSON.parse(
      fs.readFileSync(
        "test-data/agent.json",
        "utf8"
      )
    );

    const agentPhone = agentData.phoneNumber;

    console.log("Agent Phone:",agentPhone);
    const loginPage = new LoginPage(page);
    const depositPage = new DepositAgent(page);
    
    await loginPage.visitPage("/login");
    await loginPage.login("system@dmoney.com","1234");

    //await depositPage.visitPage("/agent/cash-in");

    await depositPage.openDepositPage();

    await depositPage.depositeAgent(agentPhone, 2000);
    
    await depositPage.verifyDepositSuccess();

})