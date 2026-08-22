import { Locator, Page, expect } from "@playwright/test";

export interface AdminData{
    email : string;
    password : string;
}

export class AdminLogin{
    readonly page : Page;
    readonly emailInput : Locator;
    readonly passwordInput : Locator;
    readonly submitBtn : Locator;


    constructor(page : Page){
        this.page = page;
        this.emailInput = page.getByRole("textbox", { name: "Email or Phone Number"});
        this.passwordInput = page.getByRole("textbox",{ name: "Password"});
        this.submitBtn = page.getByRole("button",{ name: "Login →"});
    }

    async visitPage(url:string){
        await this.page.goto(url);
    }

    async adminLogin(admin : AdminData){
        await this.emailInput.fill(admin.email);
        await this.passwordInput.fill(admin.password);
        await this.submitBtn.click();
    }

    async loginSuccess() {
    await expect(this.page).toHaveURL(/\/profile/);
    await expect(this.page.getByText('Admin Dashboard')).toBeVisible();
  }


}