import fs from 'fs';
import path from 'path';
import initApp from '../src/init';
import 'bootstrap/dist/js/bootstrap.min';

const getTree = () => document.documentElement.innerHTML;

beforeAll(() => {
  const pathToHtmlFile = path.resolve(__dirname, '__fixtures__/index.html');
  const html = fs.readFileSync(pathToHtmlFile, 'UTF-8');

  document.documentElement.innerHTML = html;
  initApp();
});

test('Start RSS-reader', () => {
  expect(getTree()).toMatchSnapshot();
});

test('Input invalid RSS-feed URL', (done) => {
  const feedUrlInput = document.querySelector('#feed-url');
  feedUrlInput.value = 'dsddfasggasgs';

  const e = new Event('input', { bubbles: true });
  feedUrlInput.dispatchEvent(e);

  setTimeout(() => {
    expect(getTree()).toMatchSnapshot();
    done();
  }, 100);
});

test('Input valid RSS-feed URL', (done) => {
  const feedUrlInput = document.querySelector('#feed-url');
  feedUrlInput.value = 'http://lorem-rss.herokuapp.com/feed?unit=year';

  const e = new Event('input', { bubbles: true });
  feedUrlInput.dispatchEvent(e);

  setTimeout(() => {
    expect(getTree()).toMatchSnapshot();
    done();
  }, 100);
});

test('Submit RSS-feed adding', (done) => {
  const submitButton = document.querySelector('#submit-feed-add');

  const e = new Event('click');
  submitButton.dispatchEvent(e);

  setTimeout(() => {
    expect(getTree()).toMatchSnapshot();
    done();
  }, 5000);
}, 6000);

test('Submit RSS-feed adding for not RSS-url', (done) => {
  const feedUrlInput = document.querySelector('#feed-url');
  feedUrlInput.value = 'http://gdgdggsdfhsdh.ru';
  const e1 = new Event('input', { bubbles: true });
  feedUrlInput.dispatchEvent(e1);

  setTimeout(() => {
    const submitButton = document.querySelector('#submit-feed-add');
    const e2 = new Event('click');
    submitButton.dispatchEvent(e2);

    setTimeout(() => {
      expect(getTree()).toMatchSnapshot();
      done();
    }, 5000);
  }, 100);
}, 6000);
