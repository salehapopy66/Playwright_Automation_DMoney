import { test, expect } from "@playwright/test";
import { AdminLogin, AdminData } from "../pages/adminlogin.pom";
import { AgentActivation } from "../pages/activateAgent.pom";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Admin - Activate Agent", () => {

  test("Admin activates a pending agent account", async ({ page }) => {

    const loginPage = new AdminLogin(page);
    const activationPage = new AgentActivation(page);

    // Login as Admin
    await loginPage.visitPage("/login");

    const admin: AdminData = {
      email: "admin@dmoney.com",
      password: "1234",
    };

    await loginPage.adminLogin(admin);

    // Verify login success
    await expect(page).toHaveURL(/\/profile/);

    // Open users page
    await activationPage.visitUsersPage("/admin/users");

    // Open first pending user
    await activationPage.openFirstPendingUser();

    // Change status to Active
    await activationPage.activateAgent();

    // Verify success message
    await activationPage.statusUpdateMsg();
  })
})