This project is an attempt to build a better interface to edit content on a project I worked on.

The project was a marketing website with several pages and each page had a set of reusable modules.

We used GraphCMS to hold the content and provide a GraphQL api.

For this tool to work:

- your schema must have a Page schema with a string array field called `moduleIds`.
- the modules' schemas name should end with `Module`.

## Features

- [x] List pages
- [x] Edit page
- [x] Add modules
- [x] Edit modules
- [x] Reorder modules
- [x] Remove modules
- [x] Build form based on GraphQL schema
- [ ] Create page
- [ ] Remove page

## Develop

Add a `.env.local` file with `GRAPHQL_URL` variable pointing to your GraphCMS project endpoint.

### Install dependencies

```bash
yarn
```

### Run

```bash
yarn start
```
