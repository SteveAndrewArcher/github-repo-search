# GitHub Repo Search

A react web app that searches for Git Hub repositories for a given user.

Takes input of a Github username and hits the GitHub search API, receiving a list of that user's repositories, sorted by number of stars. Displays 10 results, with pagination that makes another request for the next (or previous) 10 results.

Debounces user input with a hook so the input value used by the fetching function only updates if the user stops typing for at least half a second

Even with debouncing, it's pretty easy to make enough requests in a one minute window that you hit GithHub's rate limiting, so that response results in an error message with a button that allows retrying the failed request


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Builds the front end app, and runs a Node server that serves it
Open [http://localhost:4242](http://localhost:4242) to view it in the browser.

### `npm start-frontend`

Starts the frontend react app only, in development mode
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### `npm run eject`

ejects the built-in create-react app configs into editable config files. But for a little project like this, out of the box configs are just fine.
