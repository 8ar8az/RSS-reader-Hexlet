import State from './State';
import initControllers from './controllers';
import initViews from './views';

const initApp = () => {
  const state = new State();
  initControllers(state);
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
