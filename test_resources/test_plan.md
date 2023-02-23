# Test Plan

## Objective
The objective of the test plan is to create test cases, determine what test cases are necessary for smoke tests and do a smoke test to ensure that the basic functionalities of the website are working as expected.
Bugs are identified and written in [Test cases](test_cases.xlsx)  in Bugs sheet.

## Scope of Smoke Test
The scope of the smoke test includes the following areas of the website:
- Registration
- User address
- Search
- Wishlist
- Cart
- Checkout
- Orders
- Logout

## Test scenarios
The following test scenarios will be executed during the smoke test:
- User registration
- Saving Shipping and Billing address
- Searching for a product
- Adding a product to wishlist
- Viewing wishlist
- Selecting a product from wishlist and adding it to cart
- Changing quantity for a product in the cart
- Verifying Checkout page contains correct data
- Verifying Order is placed
- Logging out a user

## Test environment
- Operating System: Windows 10
- Browser: Google Chrome 110.0.5481.104
- Testing framework: CypressJS

## Out of scope
For each test scenario only the basic test cases were covered following the user flow.

The following functionalities were not in scope due to time restrictions:
- Blog
- Reviews
- Social share
- Contact