Feature: automationexercise application Cart Page functionality
As a User when I visit the automationexercise application
I should see a valid Title

@CartPage_TC001 @Regression
Scenario: Cart Page has a valid Title
Given User Visits HomePage
When User Observes HomePage Title
Then title should match "Automation Exercise"
Then User clicks on Cart button
Then user should be redirected to the cart page
Then Subscription should be visible
Then User enters email id and clicks on subscribe button
Then User should be able to verify subscription message "You have been successfully subscribed!"

@AddProductsInCart_TC002 @Regression
Scenario: Add Products in Cart
Given User Visits HomePage
When User Observes HomePage Title
Then title should match "Automation Exercise"
Then User navigates to Products tab
Then User should be redirected to All Products page
Then User add first product to cart
Then User click on continue shopping button
Then User add second product to cart
Then User click on continue shopping button
Then User navigates to cart page 
# Then Verify all products added to cart
Then User verify price quantity and total price
