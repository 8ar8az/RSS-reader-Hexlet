import { watch } from 'melanke-watchjs';
import $ from 'jquery';
import _ from 'lodash';

import rssFeedTemplate from './templates/rss-feed-template';
import errorReportModalTemplate from './templates/error-report-modal-template';
import feedArticleTemplate from './templates/feed-article-template';

const getElementFromTemplate = (template, dataForTemplate) => {
  const html = _.template(template)(dataForTemplate);
  const element = document.createElement('div');
  element.innerHTML = html;
  return element.firstElementChild;
};

const generateIdFromUrl = url => _.replace(url, /\W/gi, '');

const getFeedArticlesElements = (feedArticles, feedId) => _.map(
  feedArticles,
  (article) => {
    const articleId = generateIdFromUrl(article.articleUrl);
    return getElementFromTemplate(feedArticleTemplate, { feedId, articleId, ...article });
  },
);

export default (state) => {
  const feedAddingForm = document.querySelector('#form-for-adding-feeds');
  const rssContainer = document.querySelector('.rss-container');

  watch(state.feedAddingForm, 'state', () => {
    if (state.feedAddingForm.is('invalid')) {
      feedAddingForm.elements['feed-url'].classList.add('is-invalid');
      feedAddingForm.elements['feed-url'].style.backgroundImage = 'none';
    } else {
      feedAddingForm.elements['feed-url'].classList.remove('is-invalid');
    }

    if (state.feedAddingForm.is('valid')) {
      feedAddingForm.elements['submit-feed-add'].disabled = false;
    } else {
      feedAddingForm.elements['submit-feed-add'].disabled = true;
    }

    if (state.feedAddingForm.is('empty')) {
      feedAddingForm.elements['feed-url'].value = '';
    }

    const button = feedAddingForm.elements['submit-feed-add'];

    if (state.feedAddingForm.is('processing')) {
      feedAddingForm.elements['feed-url'].disabled = true;

      const width = button.clientWidth;
      button.textContent = 'В процессе...';
      button.style.width = `${width}px`;
    } else {
      feedAddingForm.elements['feed-url'].disabled = false;

      button.textContent = 'Подписаться';
      button.style.width = 'auto';
    }
  });

  watch(state, 'lastSuccessAddedFeed', (prop, action, newValue) => {
    const { feedUrl, feed } = newValue;
    const feedId = generateIdFromUrl(feedUrl);
    const rssFeed = getElementFromTemplate(rssFeedTemplate, { feedId, ...feed });

    const feedArticlesElements = getFeedArticlesElements(feed.feedArticles, feedId);
    rssFeed.querySelector('.articles-list').append(...feedArticlesElements);
    rssContainer.append(rssFeed);
  });

  watch(state, 'lastFailureAddedFeed', (prop, action, newValue) => {
    const errorReportModal = getElementFromTemplate(errorReportModalTemplate, newValue);

    document.body.append(errorReportModal);
    $(errorReportModal).on('hidden.bs.modal', () => {
      errorReportModal.remove();
    }).modal();
  });

  watch(state, 'lastUpdatedFeed', (prop, action, newValue) => {
    const feedId = generateIdFromUrl(newValue.feedUrl);
    const feedElement = document.querySelector(`#${feedId}`);

    const feedArticlesElements = getFeedArticlesElements(newValue.newArticles, feedId);
    feedElement.querySelector('.articles-list').prepend(...feedArticlesElements);
  });
};
