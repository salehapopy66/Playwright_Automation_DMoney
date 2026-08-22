import { Page, Locator, expect } from "@playwright/test";



export class BalanceAssertionPage {
  readonly page: Page;
  readonly statementbtn : Locator;
  readonly currentBalance : Locator;


  constructor(page : Page){
    this.page = page;
    this.statementbtn = page.getByRole("link",{ name:"Self Statement"});
    this.currentBalance = page.locator("h6", {hasText: "Current Balance:"});

  }

    async openStatement(){
        await expect(this.statementbtn).toBeVisible();
        await this.statementbtn.click();

    }

    async verifyCurrentBalance(amount: number) {
    await expect(this.currentBalance).toContainText(`BDT ${amount.toFixed(2)}`);
  }
}