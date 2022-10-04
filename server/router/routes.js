const express = require('express');
// const passport = require('passport');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const cookieSession = require('cookie-session');

const cookie_secret = process.env.COOKIE_SECRET;

router.use(
  cookieSession({
    secret: 'mainSecret',
  })
);

// --------- all variables -----------------------------------------------------
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const callback_url = 'http://localhost:4000/auth/github/callback';

router.get('/github', (req, res, next) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${callback_url}`;
  return res.redirect(url);
});

router.get('/github/callback', async (req, res) => {
  const code = req.query.code;
  const token = await getAccessToken(code);
  const githubData = await getGithubUser(token);

  if (githubData) {
    // res.cookie('Github Id',githubData.id)
    // res.cookie('name', githubData.name )
    req.session.githubId = githubData.id;
    req.session.token = token;
    req.session.user = githubData.login;
    req.session.name = githubData.name;
    req.session.email = githubData.email;

    return res.redirect(
      `http://localhost:8080/?name=${req.session.name}&id=${req.session.githubId}&email=${req.session.email}&username=${req.session.user}`
    );
  } else {
    console.log('Error');
    return res.send('Error happened');
  }
});

//http://localhost/4000/auth/logout/
router.get('/logout', (req, res) => {
  req.session = null;
  console.log(req.session);
  return res.redirect('http://localhost:8080');
});

// -------- helper functions --------------------------------------------------------
async function getAccessToken(code) {
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
  const params = new URLSearchParams(res);
  return params.get('access_token');
}

async function getGithubUser(access_token) {
  const res = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  });
  console.log(res.data);
  return res.data;
}

module.exports = router;
