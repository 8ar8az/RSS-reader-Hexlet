import validator from 'validator';
import axios from 'axios';

const corsProxyURL = 'https://cors-anywhere.herokuapp.com/';

const urlValidatorConfig = {
  protocols: ['http', 'https'],
  require_protocol: true,
};

const haveXMLParsingErrors = (doc) => {
  const errorElement = doc.querySelector('parsererror');

  return !!errorElement;
};

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

    axios.get(`${corsProxyURL}${feedUrl}`, { responseType: 'text' })
      .then((response) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, 'application/xml');

        if (haveXMLParsingErrors(doc)) {
          throw new Error('RSS parsing error');
        }

        return doc;
      })
      .then((doc) => {
        state.addSuccessAddedFeed(feedUrl, doc);
      })
      .catch((error) => {
        state.addFailureAddedFeed(feedUrl, error);
      })
      .then(() => {
        state.setAddFeedProcessForEndAddingProcess();
      });
  });
};
