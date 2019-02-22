import validator from 'validator';
import axios from 'axios';
import _ from 'lodash';

const corsProxyURL = 'https://cors-anywhere.herokuapp.com/';

const urlValidatorConfig = {
  protocols: ['http', 'https'],
  require_protocol: true,
};

const haveXMLParsingErrors = (doc) => {
  const errorElement = doc.querySelector('parsererror');

  return !!errorElement;
};

const downloadFeedData = url => axios.get(`${corsProxyURL}${url}`, { responseType: 'text' })
  .then(response => response.data);

const parseFeedArticles = articleElements => Array.prototype.map.call(articleElements, (elem) => {
  const articleTitle = elem.querySelector('title').textContent;
  const articleUrl = elem.querySelector('link').textContent;
  const articleDescription = elem.querySelector('description').textContent;

  return {
    articleTitle,
    articleUrl,
    articleDescription,
  };
});

const parseFeedData = (feedData, feedUrl) => {
  const parser = new DOMParser();
  const feedDocument = parser.parseFromString(feedData, 'application/xml');

  if (haveXMLParsingErrors(feedDocument)) {
    throw new Error('RSS parsing error');
  }

  const feedTitle = feedDocument.querySelector('channel > title').textContent;
  const feedDescription = feedDocument.querySelector('channel > description').textContent;

  const feedArticles = parseFeedArticles(feedDocument.querySelectorAll('item'));

  return {
    feedUrl,
    feedTitle,
    feedDescription,
    feedArticles,
  };
};

const getNewArticles = (
  articlesOfNewFeedVersion,
  articlesOfOldFeedVersion,
) => _.differenceBy(articlesOfNewFeedVersion, articlesOfOldFeedVersion, 'articleUrl');

export default (state) => {
  const feedAddingForm = document.querySelector('#form-for-adding-feeds');

  feedAddingForm.addEventListener('input', (event) => {
    const inputData = event.target.value;

    if (validator.isEmpty(inputData)) {
      state.setAddFeedProcessForEmptyFeedURL();
    } else if (
      validator.isURL(inputData, urlValidatorConfig)
      && !state.checkFeedAlreadyAdded(inputData)
    ) {
      state.setAddFeedProcessForValidFeedURL();
    } else {
      state.setAddFeedProcessForInvalidFeedURL();
    }
  });

  feedAddingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (state.addFeedProcess.feedAddingSubmitDisabled) {
      return;
    }

    const feedUrl = event.currentTarget.elements['feed-url'].value;
    state.setAddFeedProcessForStartAddingProcess();
    state.addProcessedFeed(feedUrl);

    downloadFeedData(feedUrl)
      .then(feedData => parseFeedData(feedData, feedUrl))
      .then((feed) => {
        state.setSuccessAddedFeed(feedUrl, feed);
      })
      .catch((error) => {
        state.setFailureAddedFeed(feedUrl, error);
      })
      .finally(() => {
        state.setAddFeedProcessForEndAddingProcess();
      });
  });

  const updateFeed = feedUrl => downloadFeedData(feedUrl)
    .then(feedData => parseFeedData(feedData, feedUrl))
    .then((newFeedVersion) => {
      const oldFeedVersion = state.addedFeeds.get(feedUrl);

      const newArticles = getNewArticles(newFeedVersion.feedArticles, oldFeedVersion.feedArticles);

      if (!_.isEmpty(newArticles)) {
        state.updateFeed(feedUrl, newArticles);
      }
    })
    .catch(_.noop);

  const updateFeeds = () => {
    const addedFeedUrls = [...state.addedFeeds.keys()];

    const updatingFeedsPromises = _.map(addedFeedUrls, feedUrl => updateFeed(feedUrl));
    const updatingFeedsPromisesByTenItems = _.chunk(updatingFeedsPromises, 10);

    const iter = (updatingFeedsList) => {
      const setTimerForNextUpdating = () => {
        setTimeout(() => {
          updateFeeds();
        }, 5000);
      };

      if (_.isEmpty(updatingFeedsList)) {
        setTimerForNextUpdating();
        return;
      }

      const [head, ...rest] = updatingFeedsList;

      if (_.isEmpty(rest)) {
        Promise.all(head).finally(() => setTimerForNextUpdating());
      } else {
        Promise.all(head).finally(() => iter(rest));
      }
    };

    iter(updatingFeedsPromisesByTenItems);
  };

  updateFeeds();
};
