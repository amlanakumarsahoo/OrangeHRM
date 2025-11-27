Feature: Google Search
    @Regression_TC002 @Regression
    Scenario: Search for a term and verify results
    Given I am on Google
    When I search for "iphone"
    Then I should see the search results


    @Regression_TC003 @Regression
    Scenario: Search for a term and verify results
    Given I am on Google
    When I search for "iphone"
    Then I should see the search results`
    