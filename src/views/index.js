import { watch } from 'melanke-watchjs';
import $ from 'jquery';
import getRssFeed from './rss-feed';
import getErrorReportModal from './error-report-modal';

export default (state) => {
  const feedAddingForm = document.querySelector('#form-for-adding-feeds');
  const rssContainer = document.querySelector('.rss-container');

  watch(state.addFeedProcess, 'newFeedUrlValid', () => {
    if (state.addFeedProcess.newFeedUrlValid) {
      feedAddingForm.elements['feed-url'].classList.remove('is-invalid');
    } else {
      feedAddingForm.elements['feed-url'].classList.add('is-invalid');
      feedAddingForm.elements['feed-url'].style.backgroundImage = 'none';
    }
  });

  watch(state.addFeedProcess, 'feedAddingSubmitDisabled', () => {
    feedAddingForm.elements['submit-feed-add'].disabled = state.addFeedProcess.feedAddingSubmitDisabled;
  });

  watch(state.addFeedProcess, 'newFeedUrlDisabled', () => {
    feedAddingForm.elements['feed-url'].disabled = state.addFeedProcess.newFeedUrlDisabled;
  });

  watch(state.addFeedProcess, 'feedAddingInProcess', () => {
    const button = feedAddingForm.elements['submit-feed-add'];

    if (state.addFeedProcess.feedAddingInProcess) {
      const width = button.clientWidth;
      button.textContent = 'В процессе...';
      button.style.width = `${width}px`;
    } else {
      feedAddingForm.elements['submit-feed-add'].textContent = 'Подписаться';
      button.style.width = 'auto';
    }
  });

  watch(state, 'lastSuccessAddedFeed', (prop, action, newValue) => {
    const { feedDocument } = newValue;
    const rssFeed = getRssFeed(feedDocument);
    rssContainer.append(rssFeed);

    feedAddingForm.elements['feed-url'].value = '';
  });

  watch(state, 'lastFailureAddedFeed', (prop, action, newValue) => {
    const errorReportModal = getErrorReportModal(newValue);

    document.body.append(errorReportModal);
    $(errorReportModal).on('hidden.bs.modal', () => {
      errorReportModal.remove();
    }).modal();
  });
};
