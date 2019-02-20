import { watch } from 'melanke-watchjs';
import $ from 'jquery';
import RssFeed from './entities/RssFeed';
import ErrorReportModal from './entities/ErrorReportModal';

export default (state) => {
  const newFeedForm = document.querySelector('#form-for-adding-feeds');
  const rssContainer = document.querySelector('.rss-container');

  watch(state, 'newFeedURLStatus', () => {
    if (state.isNewFeedURLStatusEmpty()) {
      newFeedForm.elements['feed-url'].classList.remove('is-invalid');
      newFeedForm.elements['submit-feed-add'].disabled = true;
    }

    if (state.isNewFeedURLStatusValid()) {
      newFeedForm.elements['feed-url'].classList.remove('is-invalid');
      newFeedForm.elements['submit-feed-add'].disabled = false;
    }

    if (state.isNewFeedURLStatusInvalid()) {
      newFeedForm.elements['feed-url'].classList.add('is-invalid');
      newFeedForm.elements['feed-url'].style.backgroundImage = 'none';
      newFeedForm.elements['submit-feed-add'].disabled = true;
    }
  });

  watch(state, 'lastDownloadedFeed', (prop, action, newValue) => {
    const feedDocument = state.getDownloadedFeedDocument(newValue);

    const rssFeed = new RssFeed(feedDocument);
    rssContainer.append(rssFeed.render());
  });

  watch(state, 'lastFeedWithAddingError', (prop, action, newValue) => {
    const errorReportModal = new ErrorReportModal(newValue);
    const modal = errorReportModal.render();

    document.body.append(modal);
    $(modal).on('hidden.bs.modal', () => {
      modal.remove();
    }).modal();
  });
};
