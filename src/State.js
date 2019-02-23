import StateMachine from 'javascript-state-machine';

export default class State {
  constructor() {
    this.feedAddingForm = new StateMachine({
      init: 'empty',
      transitions: [
        { name: 'inputInvalidData', from: ['empty', 'valid', 'invalid'], to: 'invalid' },
        { name: 'inputValidData', from: '*', to: 'valid' },
        { name: 'clear', from: ['invalid', 'valid', 'processing'], to: 'empty' },
        { name: 'startFeedAddingProcess', from: 'valid', to: 'processing' },
      ],
    });

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

  getFeedByUrl(feedUrl) {
    return this.addedFeeds.get(feedUrl);
  }

  getAllAddedFeedsUrls() {
    return [...this.addedFeeds.keys()];
  }

  setProcessedFeedAsSuccessful(feedUrl, feed) {
    this.addedFeeds.set(feedUrl, feed);
    this.lastSuccessAddedFeed = { feedUrl, feed };
  }

  setProcessedFeedAsFailed(feedUrl, error) {
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
}
