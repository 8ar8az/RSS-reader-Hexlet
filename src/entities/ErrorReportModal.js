import _ from 'lodash';
import template from '../templates/error-report-modal';

export default class ErrorReportModal {
  constructor(feedWithAddingError) {
    this.feedWithAddingError = feedWithAddingError;
    this.template = template;
    this.element = null;
  }

  render() {
    if (this.element) {
      return this.element;
    }

    const html = _.template(this.template)(this.feedWithAddingError);
    const modal = document.createElement('div');
    modal.innerHTML = html;
    this.element = modal.firstElementChild;

    return this.element;
  }
}
