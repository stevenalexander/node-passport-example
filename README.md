# Node Passport example

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Simple [Express](https://expressjs.com/) to call an OAuth 2.0 provider using Passport to hold session.

Assumes your OAuth provider exposes a user details API which takes an access_token to validate the token and return user details with an `email` property.

## Requires

* [Node](https://nodejs.org/en/)

## Run

```
npm install

# Set environment variables for OAuth provider
# export CLIENT_ID='****'
# export CLIENT_SECRET='****'
# export TOKEN_HOST='https://www.my-oauth.com'
# export TOKEN_PATH='/oauth/token'
# export AUTHORIZE_PATH='/oauth/authorize'
# export REDIRECT_URI='http://localhost:3000/auth/my-oauth/callback'
# export USER_DETAILS_PATH='/api/user_details'

# available http://localhost:3000
npm start
```

## Test

Unit tests

```
npm test
```