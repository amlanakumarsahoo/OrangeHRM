import { Page } from 'playwright';
export declare class OrangeHRMRecruitmentPage {
    private page;
    private vacanciesTab;
    private addButton;
    private jobTitleSelect;
    private vacancyNameInput;
    private hiringManagerInput;
    private saveButton;
    private successMessage;
    private searchInput;
    constructor(page: Page);
    /**
     * Navigate to Vacancies tab
     */
    navigateToVacancies(): Promise<void>;
    /**
     * Click Add button to create new vacancy
     */
    clickAddButton(): Promise<void>;
    /**
     * Create a new vacancy
     */
    createVacancy(jobTitle: string, vacancyName: string, hiringManager: string): Promise<void>;
    /**
     * Verify success message
     */
    verifySuccessMessage(): Promise<void>;
    /**
     * Search for a vacancy
     */
    searchVacancy(vacancyName: string): Promise<void>;
    /**
     * Check if vacancy exists in the list
     */
    isVacancyInList(vacancyName: string): Promise<boolean>;
}
//# sourceMappingURL=OrangeHRMRecruitmentPage.d.ts.map