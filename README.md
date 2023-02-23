# Shop Demoqa Cypress.js Smoke Test

This README file provides instructions for running a Cypress.js smoke test for the https://shop.demoqa.com website.

### [Test plan](test_resources/test_plan.md)
### [Test cases](test_resources/test_cases.xlsx)

## Prerequisites

- Node.js

## Getting Started
To get started with the smoke test, follow these steps:

1. Clone the repository to your local machine

2. Install dependencies using NPM:
    ```bash
    npm install
    ```

3. Start Cypress
    ```bash
    npx cypress open
    ```

4. Once Cypress opens, click on E2E testing, select browser and click Start E2E Testing. Click on the smoke.cy.js file. The test will run in a new window.

5. To run the test headlessly (i.e. without the UI), use the following command instead:
    ```bash
    npx cypress run --spec cypress/e2e/smoke.cy.js
    ```

6. Once the test is finished running, you can view the video of the smoke test in the cypress/videos folder.

## Objective
This test spec smoke tests essential features of the website following a user flow which includes:
- Registration
- Saving Shipping and Billing address
- Searching for a product
- Adding a product to wishlist
- Viewing wishlist
- Selecting a product from wishlist and adding it to cart
- Changing quantity for a product in the cart
- Verifying Checkout page contains correct data
- Verifying Order is placed
- Logout
