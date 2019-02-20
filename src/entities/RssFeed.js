import _ from 'lodash';
import template from '../templates/rss-feed';

export default class RssFeed {
  constructor(feedDocument) {
    this.feedDocument = feedDocument;
    this.template = template;
    this.element = null;
  }

  render() {
    if (this.element) {
      return this.element;
    }

    const feedTitle = this.feedDocument.querySelector('channel > title').textContent;
    const feedDescription = this.feedDocument.querySelector('channel > description').textContent;
    const feedItems = Array.prototype.map.call(this.feedDocument.querySelectorAll('item'), (item) => {
      const title = item.querySelector('title').textContent;
      const link = item.querySelector('link').textContent;

      return { title, link };
    });

    const html = _.template(this.template)({ feedTitle, feedDescription, feedItems });

    const rssFeed = document.createElement('div');
    rssFeed.innerHTML = html;
    this.element = rssFeed.firstElementChild;

    return this.element;
  }
}
