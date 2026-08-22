import { Page, Locator, expect} from "@playwright/test"
export class AgentActivation{
    readonly page : Page;
    readonly pendingRow: Locator;
    readonly editUserBtn : Locator;
    readonly accountStatus : Locator;
    readonly saveBtn : Locator;
    readonly updateMessage : Locator


    constructor(page: Page){
        this.page= page;
        this.pendingRow = page.locator("tr").filter({ hasText: "Pending" }).first();
        this.editUserBtn= page.getByRole("button", { name: "Edit User"});
        this.accountStatus= page.getByText("Account Status", { exact: true }).locator("..").getByRole("combobox");
        this.saveBtn = page.getByRole("button",{ name: "Save Changes"});
        this.updateMessage = page.getByText("User updated successfully");
    }


    async visitUsersPage(url : string) {
        await this.page.goto(url);
    }

    async openFirstPendingUser() {
    await expect(this.pendingRow).toBeVisible({ timeout: 10000 });
    await this.pendingRow.getByRole("button", { name: "VIEW" }).click();
    }

  async activateAgent(){
    await expect(this.editUserBtn).toBeVisible({ timeout: 10000 });
    await this.editUserBtn.click();
    await this.accountStatus.click();
    await this.page.getByRole('option', { name: "Active" }).click();
    await this.saveBtn.click();
  }

  async statusUpdateMsg(){
    await expect(this.updateMessage).toBeVisible({ timeout: 10000 });

}    

}