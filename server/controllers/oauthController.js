const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

// github oauth variables
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;

module.exports = {

  async githubData(req, res, next) {
    try {
      const code = req.query.code;

      // retrieves user data with helper functions
      const token = await getAccessToken(code);
      const githubData = await getGithubUser(token);

      // stores retreived user data in res.locals for next middleware function use
      res.locals.github = githubData
      res.locals.token = token

      return next()
    } catch (error) {
      return next({ error, message: 'something went wrong getting GitHub data', log: 'middleware error in the githubData function' });
    }
  }
}

// helper function: retrieves token using github oatuh code
async function getAccessToken(code) {

  // post request made to github oauth to receive user's token value
  const res = await axios
    .post('https://github.com/login/oauth/access_token', {
      client_id,
      client_secret,
      code,
      scope: ['user:email'],
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  // enables us to extract params from response
  const params = new URLSearchParams(res);

  // extracts and returns token
  return params.get('access_token');
}

// helper function: retrieves user data for later use
async function getGithubUser(access_token) {

  // pulls user data with axios post request using the token argument
  const res = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  });

  // returns user data from github api
  return res.data;
}