import { Page,Locator, expect } from "@playwright/test";

export interface AgentData{
    name : string;
    email : string;
    password : string;
    phonenumber : string;
    nid : string;
}

export class AgentRegistration{
    readonly page : Page;
    readonly nameInput : Locator;
    readonly emailInput : Locator;
    readonly passwordInput : Locator;
    readonly phnnumberInput : Locator;
    readonly nidInput : Locator;
    readonly roleInput : Locator;
    readonly btnSubmit : Locator;
    readonly successMessage: Locator;

    constructor(page:Page){
        this.page=page;
        this.nameInput= page.getByRole("textbox",{ name: "Full Name"});
        this.emailInput= page.getByRole("textbox",{ name: "Email Address"});
        this.passwordInput= page.getByRole("textbox",{ name: "Password"});
        this.phnnumberInput= page.getByRole("textbox",{ name: "Phone Number"});
        this.nidInput= page.getByRole("textbox",{ name: "National ID (NID)"});
        this.roleInput= page.getByRole("combobox");
        this.btnSubmit= page.getByRole("button", { name: "Create Account →"});
        this.successMessage= page.getByText('Registration successful. Your account is pending approval by an admin.');

    }
    async visitPage(url:string){
        await this.page.goto(url);
    }

    async signupAgent(agent: AgentData){
        await this.nameInput.fill(agent.name);
        await this.emailInput.fill(agent.email);
        await this.passwordInput.fill(agent.password);
        await this.phnnumberInput.fill(agent.phonenumber);
        await this.nidInput.fill(agent.nid); 
    }
    async selectOptionWithArrowDown(){
        await this.roleInput.click();
        await this.page.getByRole('option', { name: 'Agent' }).click();
        await this.btnSubmit.click();
    }

    async signupSuccess() {
        await expect(this.successMessage).toBeVisible();
    }

}