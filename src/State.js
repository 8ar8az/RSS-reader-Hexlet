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
      feedUrl: null,
      feed: null,
    };

    this.lastFailureAddedFeed = {
      feedUrl: null,
      error: null,
    };

    this.lastUpdatedFeed = {
      feedUrl: null,
      newArticles: [],
    };
  }

  addProcessedFeed(feedUrl) {
    this.addedFeeds.set(feedUrl, null);
  }

  setSuccessAddedFeed(feedUrl, feed) {
    this.addedFeeds.set(feedUrl, feed);
    this.lastSuccessAddedFeed = { feedUrl, feed };
  }

  setFailureAddedFeed(feedUrl, error) {
    this.addedFeeds.delete(feedUrl);
    this.lastFailureAddedFeed = { feedUrl, error };
  }

  updateFeed(feedUrl, newArticles) {
    this.lastUpdatedFeed = { feedUrl, newArticles };

    const feed = this.addedFeeds.get(feedUrl);
    this.addedFeeds.set(feedUrl, { ...feed, feedArticles: newArticles.concat(feed.feedArticles) });
  }

  checkFeedAlreadyAdded(feedUrl) {
    return this.addedFeeds.has(feedUrl);
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
