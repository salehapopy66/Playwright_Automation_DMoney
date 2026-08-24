import { Page, Locator, expect } from "@playwright/test";

export class DepositCustomer{
    page : Page;
    cashinBtn : Locator;
    phonenumberInput : Locator;
    amountInput : Locator;
    submitBtn : Locator;
    //successMessage : Locator;


    constructor(page: Page){
        this.page=page;
        this.cashinBtn = page.getByRole("link",{ name: "Cash In"});
        this.phonenumberInput = page.getByRole("textbox",{ name: "Customer Phone Number"});
        this.amountInput = page.getByRole( "spinbutton",{ name: "Amount (BDT)"});
        this.submitBtn = page.getByRole("button",{ name: "Cash In →"});
        //this.successMessage = page.getByText(/successful/i);
    }
    
    

    async openDepositPage(){
        await expect(this.cashinBtn).toBeVisible({ timeout: 10000 });
        await this.cashinBtn.click();
    }
    //async visitPage(url:string){
        //await this.page.goto(url);

    //}

    async depositeCustomer( phoneNumber: string, amount: number){
        await this.phonenumberInput.fill(phoneNumber);
        await this.amountInput.fill(amount.toString());
        await this.submitBtn.click();
    }

    //async verifySuccessMessage(){
        //await expect(this.successMessage).toBeVisible({ timeout: 10000 });
    //}
    
}