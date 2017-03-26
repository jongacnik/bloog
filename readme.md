# bloog

[**Example ✨**](https://github.com/jongacnik/bloog)

Tiny [choo](https://github.com/yoshuawuyts/choo) app which inlines markdown files to create a blog complete with pagination and permalinks.

This is verrrry simple, but perhaps that's all we need sometimes.

## Notes

- Posts go in the **posts** directory
- Posts will be sorted by filename (dates work well for chronology)
- Some [npm scripts]() are provided to make things easier, like...
  - `npm start` runs blog locally for development
  - `npm run new` makes a new post
  - `npm run dist` builds blog for production into **dist**
  - `npm run deploy` deploys your site to github pages from **dist**
