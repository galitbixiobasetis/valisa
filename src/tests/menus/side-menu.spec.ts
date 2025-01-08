import { test } from '@playwright/test';
import { ReceivedPage } from '../../page-objects/pages/received-page';
import { TestFunctions } from '../../utils/test-functions';
import { SidebarMenuComponent } from '../../page-objects/components/sidebar-menu-component';
import { NewMailPage } from '../../page-objects/pages/new-mail-page';
import { SentMailPage } from '../../page-objects/pages/sent-mail-page';
import { DraftPage } from '../../page-objects/pages/draft-page';
import { ReviewPage } from '../../page-objects/pages/to-review-page';
import * as allure from "allure-js-commons";
import { DelaysPage } from '../../page-objects/pages/delays-page';
import { HighlightedPage } from '../../page-objects/pages/highlighted-page';
import { ConfigPage } from '../../page-objects/pages/config-page';

 
test.beforeEach(async ({ page }) => {
    await TestFunctions.goToUrl(page, '');  
});

test.describe('Lateral menu navigation', () => {

    test('should navigate to new mail', async ({ page }) => {
        const newMailPage = new NewMailPage(page);
        const sidebarMenu = new SidebarMenuComponent(page);

        await allure.step('click on new mail button', async () => {
            await sidebarMenu.navigateToNewMail();
            await newMailPage.validateURL();
        });

        await allure.step('page title is valid', async () => {
             await newMailPage.validateNewMailTitle();
        });
    });

    test('should navigate to mailbox', async ({ page }) => {
        const receivedPage = new ReceivedPage(page);
        const sidebarMenu = new SidebarMenuComponent(page);

        await allure.step('click on mailbox button', async () => {
            await sidebarMenu.navigateToMailbox();
            await receivedPage.validateURL();
        });

        await allure.step('page title is valid', async () => {
            await receivedPage.validateReceivedTitle();
        });
    });

    test ('should navigate to review', async ({ page }) => {
        const sidebarMenu = new SidebarMenuComponent(page);
        const reviewPage = new ReviewPage(page);

        await allure.step('click on review button', async () => {
            await sidebarMenu.navigateToReview();
            await reviewPage.validateURL();
        });

        await allure.step('page title is valid', async () => {
            await reviewPage.validateReviewTitle();
    });
    },
    );

    test ('should navigate to sent mail', async ({ page }) => {
        const sentMailPage = new SentMailPage(page);
        const sidebarMenu = new SidebarMenuComponent(page);

        await allure.step('click on sent mail button', async () => {
            await sidebarMenu.navigateToSentMail();
            await sentMailPage.validateURL();
        });

        await allure.step('page title is valid', async () => {
            await sentMailPage.validateSentMailTitle();
        });
    }
    );

    test ('should navigate to drafts', async ({ page }) => {
        const sidebarMenu = new SidebarMenuComponent(page);
        const draftPage = new DraftPage(page);

        await allure.step('click on draft button', async() => {
            await sidebarMenu.navigateToDraft();
            await draftPage.validateURL();
        });

        await allure.step('page title is valid', async () => {
            await draftPage.validateDraftTitle();
        }
        );
    });

    test ('should navigate to delays', async ({ page }) => {
        const delaysPage = new DelaysPage(page);
        const sidebarMenu = new SidebarMenuComponent(page);

        await allure.step('click on delays button', async() => {
            await sidebarMenu.navigateToDelays();
            await delaysPage.validateURL();
        });

        await allure.step('page title is valid', async () => {
            await  delaysPage.validateDelaysTitle();
        });
    });

    test ('should navigate to highlighted', async ({ page }) => {
        const sidebarMenu = new SidebarMenuComponent(page);
        const highlightedPage = new HighlightedPage(page);

        await allure.step('click on highlighted button', async() => {
            await sidebarMenu.navigateToHighlighted();
            await highlightedPage.validateURL();
        });

        await allure.step('page title is valid', async () => {
            await  highlightedPage.validateHighlightedTitle();
        });

    });

    test ('should navigate to config', async ({ page }) => {
     const configPage = new ConfigPage(page);
     const sidebarMenu = new SidebarMenuComponent(page);

     await allure.step('click on config button', async() => {
            await sidebarMenu.navigateToConfig();
            await configPage.validateURL();
        }
        );

        await allure.step('page title is valid', async () => {
            await  configPage.validateConfiglTitle();
        });
    });


});

 
 
