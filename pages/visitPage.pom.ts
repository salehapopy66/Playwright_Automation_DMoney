import { Page, Locator } from "@playwright/test";

export class VisitPage{
    readonly page : Page;
    readonly signupbtn : Locator;


constructor(page:Page){
        this.page=page;
        this.signupbtn = page.getByRole("banner").getByRole("link", {name: "Sign Up"});

}
async visitPage(baseURL:string){
        await this.page.goto(baseURL);
        //await this.page.waitForLoadState('networkidle');

}
async signupBtn(){
    await this.signupbtn.click();
}

}