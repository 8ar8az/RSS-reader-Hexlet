import State from './entities/State';
import AddingFeedForm from './entities/AddingFeedForm';
import initViews from './views';

const initApp = () => {
  const state = new State();

  const formElement = document.querySelector('#form-for-adding-feeds');
  // eslint-disable-next-line no-unused-vars
  const addingFeedForm = new AddingFeedForm({ form: formElement, state });

  initViews(state);
};

export default () => {
  if (document.readyState === 'complete') {
    initApp();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      initApp();
    });
  }
};
