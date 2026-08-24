import{test} from "@playwright/test";
import { VisitPage } from "../pages/visitPage.pom";

// The config's storageState auto-loads auth.json (a saved logged-in session), which
// hides the logged-out "Sign Up" link once the page hydrates. This test exercises the
// logged-out homepage, so it needs a clean, unauthenticated context.
test.use({ storageState: { cookies: [], origins: [] } });

test("Visit Page", async ({page, baseURL})=>{
   const visitpage = new VisitPage(page);
   await visitpage.visitPage(`${baseURL}`);
   await visitpage.signupBtn();
 

})