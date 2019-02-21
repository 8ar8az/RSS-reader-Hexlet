import _ from 'lodash';
import template from '../templates/error-report-modal-template';

export default (failureAddedFeed) => {
  const html = _.template(template)(failureAddedFeed);
  const modal = document.createElement('div');
  modal.innerHTML = html;
  return modal.firstElementChild;
};
