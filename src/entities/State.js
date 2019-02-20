export default class State {
  constructor() {
    this.processedFeeds = new Set();
    this.downloadedFeeds = new Map();

    this.lastDownloadedFeed = null;
    this.lastFeedWithAddingError = null;

    this.newFeedURLStatus = State.EMPTY_NEW_FEED_STATUS;
  }

  addProcessedFeed(url) {
    this.processedFeeds.add(url);
  }

  addDownloadedFeed(url, feedDocument) {
    this.downloadedFeeds.set(url, feedDocument);
    this.processedFeeds.delete(url);
    this.lastDownloadedFeed = url;
  }

  addFeedWithAddingError(url, error) {
    this.processedFeeds.delete(url);
    this.lastFeedWithAddingError = { url, error };
  }

  getDownloadedFeedDocument(url) {
    return this.downloadedFeeds.get(url);
  }

  checkFeedAlreadyAdded(url) {
    return this.processedFeeds.has(url) || this.downloadedFeeds.has(url);
  }

  setEmptyNewFeedURLStatus() {
    this.newFeedURLStatus = State.EMPTY_NEW_FEED_STATUS;
  }

  setValidNewFeedURLStatus() {
    this.newFeedURLStatus = State.VALID_NEW_FEED_STATUS;
  }

  setInvalidNewFeedURLStatus() {
    this.newFeedURLStatus = State.INVALID_NEW_FEED_STATUS;
  }

  isNewFeedURLStatusValid() {
    return this.newFeedURLStatus === State.VALID_NEW_FEED_STATUS;
  }

  isNewFeedURLStatusEmpty() {
    return this.newFeedURLStatus === State.EMPTY_NEW_FEED_STATUS;
  }

  isNewFeedURLStatusInvalid() {
    return this.newFeedURLStatus === State.INVALID_NEW_FEED_STATUS;
  }
}

State.EMPTY_NEW_FEED_STATUS = 'empty';
State.VALID_NEW_FEED_STATUS = 'valid';
State.INVALID_NEW_FEED_STATUS = 'invalid';
