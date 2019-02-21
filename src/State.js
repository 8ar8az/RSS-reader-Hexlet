export default class State {
  constructor() {
    this.addFeedProcess = {
      newFeedUrlValid: true,
      newFeedUrlDisabled: false,
      feedAddingSubmitDisabled: true,
      feedAddingInProcess: false,
    };

    this.addedFeeds = new Map();

    this.lastSuccessAddedFeed = {
      url: null,
      feedDocument: null,
    };

    this.lastFailureAddedFeed = {
      url: null,
      error: null,
    };
  }

  addProcessedFeed(url) {
    this.addedFeeds.set(url, null);
  }

  addSuccessAddedFeed(url, feedDocument) {
    this.addedFeeds.set(url, feedDocument);
    this.lastSuccessAddedFeed = { url, feedDocument };
  }

  addFailureAddedFeed(url, error) {
    this.addedFeeds.delete(url);
    this.lastFailureAddedFeed = { url, error };
  }

  checkFeedAlreadyAdded(url) {
    return this.addedFeeds.has(url);
  }

  setAddFeedProcessForEmptyFeedURL() {
    this.addFeedProcess.newFeedUrlValid = true;
    this.addFeedProcess.feedAddingSubmitDisabled = true;
  }

  setAddFeedProcessForValidFeedURL() {
    this.addFeedProcess.newFeedUrlValid = true;
    this.addFeedProcess.feedAddingSubmitDisabled = false;
  }

  setAddFeedProcessForInvalidFeedURL() {
    this.addFeedProcess.newFeedUrlValid = false;
    this.addFeedProcess.feedAddingSubmitDisabled = true;
  }

  setAddFeedProcessForStartAddingProcess() {
    this.addFeedProcess.feedAddingInProcess = true;
    this.addFeedProcess.feedAddingSubmitDisabled = true;
    this.addFeedProcess.newFeedUrlDisabled = true;
  }

  setAddFeedProcessForEndAddingProcess() {
    this.addFeedProcess.feedAddingInProcess = false;
    this.addFeedProcess.feedAddingSubmitDisabled = false;
    this.addFeedProcess.newFeedUrlDisabled = false;
  }
}
