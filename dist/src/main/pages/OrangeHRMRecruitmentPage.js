"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrangeHRMRecruitmentPage = void 0;
class OrangeHRMRecruitmentPage {
    constructor(page) {
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
    async navigateToVacancies() {
        await this.vacanciesTab.click();
    }
    /**
     * Click Add button to create new vacancy
     */
    async clickAddButton() {
        await this.addButton.click();
    }
    /**
     * Create a new vacancy
     */
    async createVacancy(jobTitle, vacancyName, hiringManager) {
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
    async verifySuccessMessage() {
        await this.successMessage.waitFor({ state: 'visible', timeout: 10000 });
    }
    /**
     * Search for a vacancy
     */
    async searchVacancy(vacancyName) {
        await this.searchInput.fill(vacancyName);
        await this.page.keyboard.press('Enter');
    }
    /**
     * Check if vacancy exists in the list
     */
    async isVacancyInList(vacancyName) {
        return await this.page.locator(`text=${vacancyName}`).isVisible();
    }
}
exports.OrangeHRMRecruitmentPage = OrangeHRMRecruitmentPage;
//# sourceMappingURL=OrangeHRMRecruitmentPage.js.map