import { Page } from 'playwright';
export declare class GoogleSearchPage {
    private page;
    private searchInput;
    private searchButton;
    private searchResults;
    private resultItems;
    constructor(page: Page);
    navigateToGoogle(baseUrl: string): Promise<void>;
    searchFor(searchTerm: string): Promise<void>;
    verifySearchResults(): Promise<void>;
    takeScreenshot(path: string): Promise<void>;
    handleCookieConsent(): Promise<void>;
}
//# sourceMappingURL=GoogleSearchPage.d.ts.map