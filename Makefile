install:
	npm install

start:
	npm start

build:
	rm -rf dist
	NODE_ENV=production npx webpack

publish:
	rm -rf dist
	npm publish

test:
	npm test

lint:
	npx eslint .

.PHONY: test