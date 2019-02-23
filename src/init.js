import '@babel/polyfill';
import 'bootstrap';
import 'jquery';
import 'popper.js';

import State from './State';
import initHandlers from './handlers';
import initRenders from './renderers';

export default () => {
  const state = new State();
  initHandlers(state);
  initRenders(state);
};
