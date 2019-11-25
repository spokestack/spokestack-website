# Contributing to spokestack.io

### tldr;

- Run the site with `yarn start`
- Run tests with `yarn test`
- Prettier enforces the style guide and will format on commit.

**Supported browsers**: (basically IE 11, modern desktop and mobile browsers) https://browserl.ist/?q=%3E0.35%25%2C+not+op_mini+all

Contributions are always welcome. Before contributing please [search the issue tracker](https://github.com/timmywil/panzoom/issues); your issue
may have already been discussed or fixed in `master`. To contribute,
[fork](https://help.github.com/articles/fork-a-repo/) Panzoom, commit your changes,
& [send a pull request](https://help.github.com/articles/using-pull-requests/).

## Feature Requests

Feature requests should be submitted in the
[issue tracker](https://github.com/timmywil/panzoom/issues), with a description of
the expected behavior & use case, where they’ll remain closed until sufficient interest,
[e.g. :+1: reactions](https://help.github.com/articles/about-discussions-in-issues-and-pull-requests/),
has been [shown by the community](https://github.com/timmywil/panzoom/issues?q=label%3A%22votes+needed%22+sort%3Areactions-%2B1-desc).
Before submitting a request, please search for similar ones in the
[closed issues](https://github.com/timmywil/panzoom/issues?q=is%3Aissue+is%3Aclosed+label%3Afeature).

This convention is borrowed from [lodash](https://github.com/lodash/lodash). It helps keep the open issues list uncluttered.

## Pull Requests

For additions or bug fixes you should only need to modify files in `src/`. Include
updated unit tests in the `test` directory. Don’t worry about regenerating the built files.

## Editing documentation

Edit the markdown files in the `docs/` folder. If you don't see your changes right away after they are released, allow some time for the changes to propagate.

## Testing

Tests are written with [mocha](https://mochajs.org/) and [Node's official assert module](https://nodejs.org/api/assert.html#assert_assert).

Here are the npm scripts that run tests:

```bash
$ yarn test # Lints and runs the unit tests
$ yarn test:unit # Runs the unit tests
$ yarn test:watch # Watches files and runs the unit tests on file save
```

## Running the site

To run the site, first make sure dependencies are installed (`yarn` or `npm i`) and run the following:

```bash
$ yarn start
```

This spins up a local server at http://localhost:8000.

To test in production mode, run the following:

```bash
$ yarn build # or npm run build
$ yarn serve
```

## Coding Guidelines

In addition to the following guidelines, please follow the conventions already
established in the code.

- **Spacing**:<br>
  Use two spaces for indentation. No tabs.

- **Naming**:<br>
  Keep variable & method names concise & descriptive.<br>
  Variable names `index`, `array`, & `iteratee` are preferable to
  `i`, `arr`, & `fn`.

- **Quotes**:<br>
  Single-quoted strings are preferred to double-quoted strings; however,
  please use a double-quoted string if the value contains a single-quote
  character to avoid unnecessary escaping.

- **Comments**:<br>
  Comments are kept to a minimum, but are encouraged to explain confusing bits of code.

- **Types**:<br>
  Panzoom is written in TypeScript and documentation is generated from the type annotations.
  Any code additions should be properly typed, with no use of `any`.

Guidelines are enforced using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/):

```bash
$ yarn lint # or npm run lint
```

Some things are fixable automatically.

```bash
$ yarn lint:fix
```

This script is run on commit, which means that the commit may need amending if any changes were made as a result of the commit.

Check the working directory is clean of all changes after committing.

## Commit message guidelines

Commit messages should follow [Conventional Commits Specification(https://www.conventionalcommits.org).

This is also enforced on commit using a commit message hook.

spokestack.io includes a helpful prompt for committing to guide you in the process of writing a valid commit message.

Run the following after staging files:

```bash
$ yarn commit
```

## Updating GraphQL query types

The TypeScript types are generated from the schema using [GraphQL Code Generator](https://github.com/dotansimha/graphql-code-generator#readme).

To update, run `yarn schema`.

## Adding a new documentation page

Follow the examples in the `content/docs` folder.

Sub-folders are automatically grouped and the section takes on the name of the folder. Casing is not be automatically adjusted, so the casing of the folder should be identical to the intended name of the section.

The order of links in the docs navigation is dictated by `content/docs/nav.json`. No folder names are necessary. Enter the title of the post wherever it should appear in the list.
