import { $, $$ , expect} from '@wdio/globals';
import Page from './page';
import { driver } from '@wdio/globals';

class ReadyPage extends Page {
  constructor () {
    super().title = 'Ready to Vote? - WeVote';
  }

  get avatar () {
    return super.avatar;
  }

  get electionCountDownTitle () {
    return $('//*[contains(@id, "electionCountDownTitle")]');
  }

  get wevoteLogo () {
    return $('//*[contains(@id, "HeaderLogoImage")]');
  }

  get ballotTitle () {
    return $('//*[contains(@id, "ballotTitleHeader")]');
  }

  get ballotAddress () {
    //return $('#ballotTitleBallotAddress');
    return $('//span[@class ="u-cursor--pointer u-link-color u-link-underline-on-hover"]');

  }

  get ballotAddressInput () {
    return $('#entryBox');
  }

  get saveBallotAddressButton () {
    return $('#addressBoxModalSaveButton');
  }

  get viewUpcomingBallotButton () {
    return $('//*[contains(@id, "viewUpcomingBallot")]');
  }

  get unfurlIssuesButton () {
    return $('//*[contains(@id, "showMoreReadyPageValuesList")]');
  }

  get toggleIntroductionButton () {
    return $('#toggleContentButton-showMoreReadyIntroductionCompressed');
  }

  get introductionStepText () {
    return $$('//*[contains(@id, "readyIntroductionStepText")]');
  }

  get getIntroText () {
    return $('.StepText-sc-lvvjo6-11 kIDCci');
  }

  get toggleFinePrintButton () {
    return $('#toggleContentButton-showMoreReadyFinePrintCompressed');
  }

  get finePrintStepText () {
    return $$('//*[contains(@id, "readyFinePrintStepText")]');
  }

  get finePrintStepHeaderText1()
  {
    return $("(//div[@class='StepTitle-sc-lvvjo6-10 iKrjzD'][normalize-space()='You cannot cast your vote electronically'])[1]");
  }

  get finePrintStepHeaderText2()
  {
    return $('//div[text() = "WeVote does not represent a government entity"]');
  }

  get finePrintStepHeaderText3()
  {
    return $('//div[text() = "Please make sure you are registered to vote"]');
  }

  get finePrintStepHeaderText4()
  {
    return $('//div[text() = "How your data is used & protected"]');
  }

  async checkFinePrintHeaders()
  {
    const text1 = (await this.finePrintStepHeaderText1);
    console.log("text1: " + text1);
    const text2 = (await this.finePrintStepHeaderText2);
    console.log("text2: " + text2);
    const text3 = (await this.finePrintStepHeaderText3);
    console.log("text3: " + text3);
    const text4 = (await this.finePrintStepHeaderText4);
    console.log("text4: " + text4);

    await expect(text1).toHaveText('You cannot cast your vote electronically');
    await expect(text2).toHaveText('WeVote does not represent a government entity');
    await expect(text3).toHaveText('Please make sure you are registered to vote');
    await expect(text4).toHaveText('How your data is used & protected');

  }


  get followIssueButtons () {
    return $$('//*[contains(@id, "issueFollowButton")]');
  }

  get toggleFollowMenuButtons () {
    return $$('//*[contains(@id, "toggleFollowMenuButton")]');
  }

  get unfollowIssueButtons () {
    return $$('//*[contains(@id, "issueUnfollowButton")]');
  }

  get getFollowPopularTopicsElement () {
    return $('#PopularTopicsHeader');
  }

  get selectAddress () {
    return $('(//div[@class = "pac-item"])[1]');
  }

  get getSignInElement () {
    return $('#signIn');
  }

  get getMobilePhoneNumberElement () {
    return $('#enterVoterPhone');
  }

  get getSendCodeElement () {
    return $('#desktopSmsSendCode');
  }

  get getCodeVerificationDigit1Element () {
    return $('#digit1');
  }

  get getCodeVerificationDigit2Element () {
    return $('#digit2');
  }

  get getCodeVerificationDigit3Element () {
    return $('#digit3');
  }

  get getCodeVerificationDigit4Element () {
    return $('#digit4');
  }

  get getCodeVerificationDigit5Element () {
    return $('#digit5');
  }

  get getCodeVerificationDigit6Element () {
    return $('#digit6');
  }

  get getVerifyButtonElement () {
    return $('#emailVerifyButton');
  }

  get getProChoiceLinkElement () {
    return $('a[href="/value/pro-choice"]');
  }

  get getDemocraticClubsLinkElement() {
    return $('a[href="/value/democratic_clubs"]')
  }

  get getProfileIconElement() {
    return $('#profileAvatarHeaderBar');
  }


  async login () {
    const waitTime = 5000;
    await this.load();
    await driver.pause(waitTime);
    await driver.waitUntil(async () => (this.getSignInElement.isClickable()));
    await this.getSignInElement.click();
   
    await driver.waitUntil(async () => (this.getMobilePhoneNumberElement.isClickable()));
    await this.getMobilePhoneNumberElement.setValue("8089358555");

    await driver.waitUntil(async () => (this.getSendCodeElement.isClickable()));
    await this.getSendCodeElement.click();

    await driver.waitUntil(async () => (this.getCodeVerificationDigit1Element.isClickable()));
    await this.getCodeVerificationDigit1Element.setValue("1");

    await driver.waitUntil(async () => (this.getCodeVerificationDigit2Element.isClickable()));
    await this.getCodeVerificationDigit2Element.setValue("2");

    await driver.waitUntil(async () => (this.getCodeVerificationDigit3Element.isClickable()));
    await this.getCodeVerificationDigit3Element.setValue("3");

    await driver.waitUntil(async () => (this.getCodeVerificationDigit4Element.isClickable()));
    await this.getCodeVerificationDigit4Element.setValue("4");

    await driver.waitUntil(async () => (this.getCodeVerificationDigit5Element.isClickable()));
    await this.getCodeVerificationDigit5Element.setValue("5");

    await driver.waitUntil(async () => (this.getCodeVerificationDigit6Element.isClickable()));
    await this.getCodeVerificationDigit6Element.setValue("6");

    await driver.waitUntil(async () => (this.getVerifyButtonElement.isClickable()));
    await this.getVerifyButtonElement.click();
  } 
  
   async load () {
    await super.open('/ready');
  }

  async signIn () {
    await super.signIn();
  }

  async openBallotModal () {
    await this.ballotTitle.findAndClick();
  }

  async openBallotcount () {
    await this.electionCountDownTitle.findAndClick();
  }

  async updateBallotAddress (ballotAddress) {
    await this.ballotAddress.findAndClick();

    await this.ballotAddressInput.setValue(ballotAddress);
    await this.selectAddress.click();
    await this.saveBallotAddressButton.findAndClick();
  }

  async followFirstIssue () {
    await this.followIssueButtons[0].findAndClick();
  }

  async unfollowFirstIssue () {
    await this.toggleFollowMenuButtons[0].findAndClick();
    await this.unfollowIssueButtons[0].findAndClick();
  }

  async unfurlIssues () {
    await this.unfurlIssuesButton.findAndClick();
  }

  async toggleIntroduction () {
    await this.toggleIntroductionButton.findAndClick();
  }

  async toggleIntroStepText () {
    await this.introductionStepText.findAndClick();
  }

  async toggleFinePrint () {
    await this.toggleFinePrintButton.findAndClick();
  }
}     
export default new ReadyPage();
