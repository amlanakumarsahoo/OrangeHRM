Feature: Google Search
    @Regression_TC001 @Regression
    Scenario: Search for a term and verify results
    Given I am on Google
    When I search for "Playwright testing framework"
    Then I should see the search results
    