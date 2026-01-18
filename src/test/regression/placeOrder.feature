Feature: automationexercise application Place Order functionality

    @PlaceOrder_TC001 @Regression
    Scenario:Place Order functionality
        Given User Visits HomePage
        When User Observes HomePage Title
        Then title should match "Automation Exercise"
        Then User click on view product from home page
        Then User verifies product name, category, price, availability, condition, brand
        Then User click on Add to cart button
        Then User click on continue shopping button
        Then User navigates to cart page
        Then User validate with expected product quantity "1"
        Then User click on Proceed To Checkout button
        Then User click on Register Login button
        Then User signup and create account
        # Then User fill all details in Signup and create account
        # Then user should be able to verify account created confirmation
        # Then user clicks on continue button
        # Then user should be able to verify loggedin user
        # Then User click on Add to cart button
        # Then User click on Proceed To Checkout button
        # Then User verify Address Details and Review Your Order

        # Examples:
        #     | username | emailaddress      | country       | state    | city     | zipCode | mobileNumber |
        #     | Amlana90 | xamlana@gmail.com | United States | New York | New York | 10001   | 1234567890   |



