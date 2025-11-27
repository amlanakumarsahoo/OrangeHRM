import { Page, Locator } from 'playwright';

export class OrangeHRMRecruitmentPage {
    private page: Page;
    
    // Locators
    private vacanciesTab: Locator;
    private addButton: Locator;
    private jobTitleSelect: Locator;
    private vacancyNameInput: Locator;
    private hiringManagerInput: Locator;
    private saveButton: Locator;
    private successMessage: Locator;
    private searchInput: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.vacanciesTab = page.locator('text=Vacancies');
        this.addButton = page.locator('button:has-text("Add")');
        this.jobTitleSelect = page.locator('div.oxd-select-text--after');
        this.vacancyNameInput = page.locator('input[placeholder="Enter vacancy name"]');
        this.hiringManagerInput = page.locator('input[placeholder="Type for hints..."]');
        this.saveButton = page.locator('button[type="submit"]');
        this.successMessage = page.locator('.oxd-toast--success');
        this.searchInput = page.locator('input[placeholder="Search"]');
    }
    
    /**
     * Navigate to Vacancies tab
     */
    async navigateToVacancies(): Promise<void> {
        await this.vacanciesTab.click();
    }
    
    /**
     * Click Add button to create new vacancy
     */
    async clickAddButton(): Promise<void> {
        await this.addButton.click();
    }
    
    /**
     * Create a new vacancy
     */
    async createVacancy(jobTitle: string, vacancyName: string, hiringManager: string): Promise<void> {
        await this.jobTitleSelect.click();
        await this.page.locator(`div.oxd-select-option:has-text("${jobTitle}")`).click();
        
        await this.vacancyNameInput.fill(vacancyName);
        
        await this.hiringManagerInput.fill(hiringManager);
        await this.page.waitForTimeout(1000); // Wait for dropdown to appear
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
        
        await this.saveButton.click();
    }
    
    /**
     * Verify success message
     */
    async verifySuccessMessage(): Promise<void> {
        await this.successMessage.waitFor({ state: 'visible', timeout: 10000 });
    }
    
    /**
     * Search for a vacancy
     */
    async searchVacancy(vacancyName: string): Promise<void> {
        await this.searchInput.fill(vacancyName);
        await this.page.keyboard.press('Enter');
    }
    
    /**
     * Check if vacancy exists in the list
     */
    async isVacancyInList(vacancyName: string): Promise<boolean> {
        return await this.page.locator(`text=${vacancyName}`).isVisible();
    }
}
