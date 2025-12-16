Feature: OrangeHRM Lead Management
    As an HR admin
    I want to manage leads in OrangeHRM
    So that I can track potential candidates

    @Regression_OrangeHRM_TC001 @Regression
    Scenario Outline: Create a new lead in OrangeHRM
        Given User logs into OrangeHRM <username> and <password>
        When User is on the dashboard page
        # And User creates a new lead
        # Then Lead should be created successfully
        Then user logout from application

   Examples:
       | username | password |
       | Admin    | admin123 |
       | amlana   | admin123 |
