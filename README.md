# Playwright Automation Dmoney

## Project Description
End-to-end UI automation for the DMoney practice portal:

**Application:** https://dmoneyportal.roadtocareer.net

DMoney Portal is a role-based digital-wallet practice application used to test account onboarding, administrative activation, wallet funding, balance visibility, and customer deposit transactions.The workflow below uses three roles:

- **Admin** — reviews and activates a newly registered Agent.
- **System** — funds the Agent account.
- **Agent** — checks the available balance and deposits money to a Customer.
  This project validates the Agent onboarding and transaction workflow using **Playwright + TypeScript**.

## Test scenario

The main end-to-end scenario follows these steps in order:

1. Open the DMoney portal.
2. Select **Sign Up**.
3. Register a new account with the **Agent** role.
4. Sign in as **Admin** and activate the newly registered Agent.
5. Sign in as **System** and deposit **BDT 2,000** to the Agent.
6. Sign in as the Agent and verify that the displayed balance is **BDT 2,000.00** (or the portal's equivalent currency formatting).
7. Deposit **BDT 500** to an existing Customer and verify that the transaction-success confirmation is displayed.

### Expected results

| Step | Expected result |
|---|---|
| Agent signup | The Agent registration is accepted and the new account is created in a pending/inactive state, if approval is required. |
| Admin activation | The new Agent becomes active and can sign in. |
| System deposit | A BDT 2,000 deposit to the Agent completes successfully. |
| Balance assertion | The Agent dashboard or statement shows BDT 2,000.00, assuming the starting balance is zero and no other transactions affect the account. |
| Customer deposit | The Agent can deposit BDT 500 to an existing eligible Customer and sees a successful transaction confirmation.

## Run the Project
- Clone this project
- Open cmd in the root folder.
- Give the following command: `npx playwright test`

## Automation Script Report
<img width="851" height="594" alt="run_success" src="https://github.com/user-attachments/assets/8f9e0a0d-1695-4bc6-b156-23ab6b2c4b90" />



