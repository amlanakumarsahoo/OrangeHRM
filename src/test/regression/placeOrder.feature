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
        # Then user should be able to verify loggedin user
        Then User navigates to cart page
        Then user should be redirected to the cart page
        Then User click on Proceed To Checkout button
        Then User verify address details and review order
        Then User enter description
        Then User click on place order button

  


