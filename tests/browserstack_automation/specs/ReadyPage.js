import { driver, expect, browser } from '@wdio/globals';
import ReadyPage from '../page_objects/ready.page';
import DonatePage from '../page_objects/donate.page';
import webAppConfig from '../../../src/js/config';

const waitTime = 8000;

/* eslint-disable no-undef */
// This eslint-disable turns off warnings for describe() and it()
// We don't need those warnings, because describe() and it() are available at runtime
// https://webdriver.io/docs/pageobjects

describe('ReadyPage', function() {
  this.timeout(9999999);
  // Ready_001 and Ready_003
  it('verifyElectionCountDownRedirect and verifyViewYourBallotRedirect', async () => {
    console.log('Tcs : Ready_001 and Ready_003');
    await ReadyPage.load();
    await driver.pause(waitTime);
    await driver.waitUntil(async () => (ReadyPage.electionCountDownTitle.isClickable()));
    await ReadyPage.electionCountDownTitle.click();
    await driver.pause(waitTime + 2000);
    await driver.switchWindow('ballot/election/1000336');
    await expect(browser).toHaveTitle('Ballot - WeVote');

    const currentUrl = await driver.getUrl();
    console.log(currentUrl);
    await driver.switchWindow('Ballot - WeVote');
    await driver.pause(waitTime);
    await expect(driver).not.toHaveUrl(expect.stringContaining('ready'));
    console.log('Verified verifyElectionCountDownRedirect');
    await ReadyPage.wevoteLogo.findAndClick();
    await ReadyPage.viewUpcomingBallotButton.findAndClick();
    await driver.pause(waitTime);
    await expect(driver).not.toHaveUrl(expect.stringContaining('ready'));
  });

  // Ready_002 : In progress - locater issues
  it.skip('updateBallotAddress', async () => {
    console.log('Tcs : Ready_002');
    await ReadyPage.load();
    await ReadyPage.updateBallotAddress('New York, NY, USA');
    await driver.pause(waitTime);
    // const newAdd = browser.getText("//span[@class='u-cursor--pointer u-link-color u-link-underline-on-hover']");
    // console.log("newAdd :" +newAdd);
    expect((await ReadyPage.ballotForAddress).toHaveText('New York, NY, USA'));
  });

  // Ready_003 - merged with ready_001


  // Ready_004
  it('toggleIssueFollowing - Follow/UnfollowPopular Topics', async () => {
    console.log('Tcs : Ready_004');
    await ReadyPage.load();
    await ReadyPage.followFirstIssue();
    await driver.pause(waitTime);
    await expect(ReadyPage.toggleFollowMenuButtons).toBeElementsArrayOfSize(1);
    await ReadyPage.unfollowFirstIssue();
    await driver.pause(waitTime);
    await expect(ReadyPage.toggleFollowMenuButtons).toBeElementsArrayOfSize(0);
  });

  // Ready_005
  it('unfurlIssues - PopularIssues/ShowMoreIssues', async () => {
    console.log('Tcs : Ready_005');
    await ReadyPage.load();
    await driver.pause(waitTime);
    await expect(ReadyPage.followIssueButtons).toBeElementsArrayOfSize(6);
    await ReadyPage.unfurlIssues();
    await driver.pause(waitTime);
    await expect(ReadyPage.followIssueButtons).toBeElementsArrayOfSize({ gte: 6 });
  });

  // Ready_006
  it('toggleIntroduction - ShowMore-WeVoteHelpsYouList', async () => {
    console.log('Tcs : Ready_006');
    await ReadyPage.load();
    await driver.waitUntil(async () => (ReadyPage.toggleIntroductionButton.isClickable()));
    await ReadyPage.toggleIntroductionButton.click();
    await driver.pause(waitTime);
    await expect(ReadyPage.introductionStepText).toBeElementsArrayOfSize(3);
  });

  // Ready_007  -- In progress -- Seeing issues with locators
  it('toggleFinePrint - ShowMore-TheFinePrintList', async () => {
    console.log('Tcs : Ready_007');
    await ReadyPage.load();
    await driver.pause(waitTime);
    await driver.waitUntil(async () => (ReadyPage.toggleIntroductionButton.isClickable()));
    await ReadyPage.toggleFinePrintButton.click();
    await driver.pause(waitTime);
    await expect(ReadyPage.finePrintStepText).toBeElementsArrayOfSize(4);
  });

  /* Ready_008 - signin testcases - moved to signin module
  // Moving these testcases to FooterLinks :
  // Ready_009 and Ready_016
  // Ready_010 and Ready_011
  // Ready_012 deprecated as it is covered as part of Ready_013
  // Testcase 13 & 14 covered under HowItWorksModalWindow testcases
  // Ready_015
  // Ready_016 merged with Ready_009
  // Ready_017
  // Ready_016 merged with Ready_009
  // Ready_018
  // Ready_016 merged with Ready_009
  // Ready_019
  // Ready_016 merged with Ready_009
  // Ready_020 */

  // Ready_021
  it('verifyAlertMsg_FollowTopic', async () => {
    console.log('Tcs : Ready_020');
    await ReadyPage.load();
    await driver.pause(waitTime + 2000);
    await browser.scroll(0, 200);
    await driver.pause(waitTime);

     
    await ReadyPage.getDonateLinkLocator.click();
    await driver.pause(waitTime);
    await expect(driver).toHaveUrl(expect.stringContaining('donate'));
    await driver.pause(waitTime);
    await expect(DonatePage.getDonatePageContentTitleElement).toHaveText('Want more Americans to vote?');
    await expect(browser).toHaveTitle('Donate - WeVote');
  }); */





});
