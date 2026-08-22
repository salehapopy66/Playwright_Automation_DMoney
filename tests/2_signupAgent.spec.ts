import { test } from "@playwright/test";
import { AgentData, AgentRegistration } from "../pages/signupAgent.pom";
import { generateRandomNumber } from "../utils/randomNumber";
import fs from "fs";

// With the config's auto-loaded auth.json (another user's session) present, submitting
// this form redirects to that user's own /profile instead of showing the registration
// success message, so the new account's outcome is never actually verified. Registration
// must run unauthenticated.
test.use({ storageState: { cookies: [], origins: [] } });

test("Agent Registration", async({page})=>{
    const signupAgentPage = new AgentRegistration(page);
    await signupAgentPage.visitPage("/register");

    const agent: AgentData={
        name : "Alexa Deniel",
        email : `salehapopy29+${generateRandomNumber(10,99)}@gmail.com`,
        password : "1234",
        phonenumber : `01853418${generateRandomNumber(100,999)}`,
        nid : `234567${generateRandomNumber(1000,9999)}`

    }

    await signupAgentPage.signupAgent(agent);
    await signupAgentPage.selectOptionWithArrowDown();
    await signupAgentPage.signupSuccess();

    fs.writeFileSync(
    "test-data/agent.json",
    JSON.stringify(
        {
            phoneNumber: agent.phonenumber,
            eMail : agent.email,
        },
        null,
        2
    )
);

})

