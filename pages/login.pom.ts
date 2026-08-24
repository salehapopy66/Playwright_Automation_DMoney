import { Page, Locator, APIRequestContext, expect } from "@playwright/test";
import { readLatestEmail } from '../services/gmailAuth';
import { extractOTP } from '../utils/extractOTP';


export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly otpInput: Locator;
  readonly verifyOtpButton: Locator;


  constructor(page : Page){
    this.page = page;
    this.emailInput = page.getByRole("textbox", { name: "Email or Phone Number"});
    this.passwordInput = page.getByRole("textbox",{ name: "Password"});
    this.loginButton = page.locator('button[type="submit"]');
    this.otpInput = page.getByRole("textbox",{name:"Enter 4-Digit OTP"});
    this.verifyOtpButton = page.getByRole("button",{name:"Verify OTP →"});

  }

  async visitPage(url:string){
    await this.page.goto(url);
}

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}

async submitOtp(otp : string){
  await this.otpInput.fill(otp);
  await this.verifyOtpButton.click();
}

async loginWithOtp(
    email: string,
    password: string,
    request: APIRequestContext
  ){
    const previousOTP= extractOTP(await readLatestEmail(request));
    await this.login(email, password);

    let newOTP = '';
      await expect.poll(async () => {
          newOTP = extractOTP(await readLatestEmail(request));
          return newOTP !== previousOTP;
      }, { timeout: 20000, intervals: [2000] }).toBe(true);
      
    await this.submitOtp(newOTP);
    
    //console.log("Current URL:", this.page.url());
   // await expect(this.page).toHaveURL(/profile/);
    //await this.page.waitForURL(/profile\/*/,{timeout: 30000});

    }
}