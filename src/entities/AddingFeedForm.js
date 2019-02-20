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

export default class AddingFeedForm {
  constructor({ form, state }) {
    this.form = form;
    this.state = state;

    this.form.addEventListener('input', () => {
      this.validate();
    });

    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
  }

  validate() {
    const input = this.form.elements['feed-url'];

    if (validator.isEmpty(input.value)) {
      this.state.setEmptyNewFeedURLStatus();
    } else if (
      validator.isURL(input.value, urlValidatorConfig)
      && !this.state.checkFeedAlreadyAdded(input.value)
    ) {
      this.state.setValidNewFeedURLStatus();
    } else {
      this.state.setInvalidNewFeedURLStatus();
    }
  }

  setFeedURL(url) {
    this.form.elements['feed-url'].value = url;
    this.validate();
  }

  clearForm() {
    this.setFeedURL('');
  }

  submit() {
    console.log(this.state.newFeedURLStatus);

    if (!this.state.isNewFeedURLStatusValid()) {
      return;
    }

    const url = this.form.elements['feed-url'].value;
    this.clearForm();

    this.state.addProcessedFeed(url);

    axios.get(`${corsProxyURL}${url}`, { responseType: 'text' })
      .then((response) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, 'application/xml');

        if (haveXMLParsingErrors(doc)) {
          throw new Error('RSS parsing error');
        }

        return doc;
      })
      .then((doc) => {
        this.state.addDownloadedFeed(url, doc);
      })
      .catch((error) => {
        this.state.addFeedWithAddingError(url, error);
      });
  }
}
