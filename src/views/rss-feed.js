import _ from 'lodash';
import template from '../templates/rss-feed-template';

export default (feedDocument) => {
  const feedLink = feedDocument.querySelector('channel > link').textContent;
  const feedId = _.replace(feedLink, /\W/gi, '');

  const feedTitle = feedDocument.querySelector('channel > title').textContent;
  const feedDescription = feedDocument.querySelector('channel > description').textContent;
  const feedItems = Array.prototype.map.call(feedDocument.querySelectorAll('item'), (item) => {
    const title = item.querySelector('title').textContent;
    const link = item.querySelector('link').textContent;
    const description = item.querySelector('description').textContent;

    return { title, link, description };
  });

  const html = _.template(template)({
    feedTitle,
    feedDescription,
    feedId,
    feedItems,
  });

  const rssFeed = document.createElement('div');
  rssFeed.innerHTML = html;
  return rssFeed.firstElementChild;
};
