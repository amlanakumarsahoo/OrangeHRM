Feature: automationexercise application Home Page functionality
As a User when I visit the automationexercise application
I should see a valid Title
@HomePage_TC001 @Regression
Scenario: Home Page has a valid Title
Given User Visits HomePage
When User Observes HomePage Title
Then title should match "Automation Exercise"

@SubscriptionHomePage_TC002 @Regression
Scenario: Verify Subscription in home page
Given User Visits HomePage
When User Observes HomePage Title
Then title should match "Automation Exercise"
Then Subscription should be visible
Then User enters email id and clicks on subscribe button
Then User should be able to verify subscription message "You have been successfully"

