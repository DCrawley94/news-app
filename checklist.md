# Checklist for Northcoders News Front End

## README - write your own and make sure that it:

- [ ] has a link to the deployed version
- [ ] provides general info about your app
- [ ] includes links to your back end repo
- [ ] specifies the minimum version of Node required to run locally (check your Node version, `node --version` and use the major version that you are on)
- [ ] has clear instructions on how to run your project locally (`git clone <repo-url>, cd ...`)

## UX

- [ ] Basic styling added
- [ ] Responsive design
- [✔] Items aligned
- [ ] Content legible (not too wide, obstructed, etc)
- [✔] Refreshing doesn’t cause an issue on sub-pages
- [ ] No errors in the console (`SingleArticle` page)
- [ ] Votes / Posts / Deletions happen instantly _OR_ give user indication of loading

## Functionality

### Login

- [ ] Some indication of who is logged in

### Articles

- [✔] Serves all articles / top articles
- [✔] Can vote on articles
- [✔] Can vote a maximum of once in either direction per page load
- [✔] Votes are persistent when page is refreshed
- [✔] Topic pages load only relevant articles (especially when navigating from one topic page to another)
- [✔] Can sort articles by date created / comment_count / votes

### Individual Article / Comments

- [✔] Individual articles are served with comments
- [✔] Can vote on comments
- [✔] Can vote a maximum of once in either direction per page load
- [✔] Votes are persistent when page is refreshed
- [✔] Can post new comments, which are persistent
- [✔] Can only delete comments of logged in user
- [✔] Deleted comments don’t re-appear on re-render/refresh

### Additional functionality:

- [✔] sort comments by date created / votes
- [ ] navigate over pages of articles (if implemented in back-end)
- [ ] navigate over pages of comments (if implemented in back-end)
- [ ] filter / display articles by specific user
- [ ] post new article
- [ ] delete logged in user's articles

## Error Handling

- [✔] Bad url
- [✔] Bad topic slug in url
- [✔] Bad article id in url
- [✔] Post comment: (No text in comment body / Can you post without logging in?)

## Code

- [✔] Well named components
- [✔] Functional components used where possible
- [✔] Components reused where possible (`Articles` / `Voter`...)
- [ ] Minimal state - don't hold derivable data in state
- [✔] Set state correctly, using previous state where possible
- [✔] Handle asynchronicity clearly (i.e. isLoading pattern)
- [✔] Functions are DRY (`handleChange` for controlled components / api calls)
- [✔] Use object destructuring where possible
- [✔] Tidy? If not: ESLint / Prettier
- [✔] `node_modules` git ignored
- [ ] No `console.log`s / comments
- [✔] remove unnecessary files (e.g. App.test.js) - MOSTLY - don't forget to run through and remove things like `index.css` and `utils.js`

## MAKE SURE ALL TESTS ARE STILL PASSING IN BACK END

## Once everything else is complete, here are some extra challenges:

- [ ] Use `aXe` extension to check for a11y issues
- [ ] Make sure any pure functions are extracted and tested with `Jest`
- [ ] Add integration tests with `cypress`
- [ ] Use Context API for sharing logged in user amongst components
- [ ] Use React Hooks
- [ ] Create a user page where you can change their profile information if they are "logged in as the right user". This will require having an additional PATCH endpoint on your backend
- [ ] Create a view for all the articles a user has liked. This will require additional functionality on your backend
- [ ] Make use of [web sockets](https://en.wikipedia.org/wiki/WebSocket) to allow your page to automatically update with a little notification if there have been any recent posts. [socket.io](https://socket.io/) is quite a good one to use and has some good getting started guides. This will require additional functionality on your backend for recent articles e.g. last 10 minutes

## NOTES

### UX

- [✔] Sorting works great but perhaps some reference to number of votes/comments on each of the articles on the `ArticleList` would clarify that it is working
- [ ] I know there's no styling yet (which is fine!) but would recommended sticking a `max-width` or similar in somewhere so that your article text doesn't stretch the full width of the screen
- [✔] I like the message for if the voting isn't working!

### Functionality

- [✔] Only being able to upvote once/downvote once is not too much effort to implement - I'm sure you can make that work!
- [✔] I would focus on getting the comment posting to work next if you aren't already!

### Code

- [✔] You have a `default` route but it is never being hit, because your router is always matching it with the parametric `/:topic` endpoint
- [✔] You have reused the `ArticleList` component which is great - think about how you can reuse the `Voter` component too
- [ ] In `AddComment`, you don't want to be setting state with values you get from props. This results in "two sources of truth" for those values and causes lots of unexpected errors
- [ ] Consider extracting out `CommentList` as a component - then you can clear up the `SingleArticle` and keep some state in there too!
- [ ] I love that you made your util function even if it ended up not being needed!
