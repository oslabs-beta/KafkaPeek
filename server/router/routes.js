const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const axios = require('axios');
const cookieSession = require('cookie-session');
const oauthController = require('../controllers/oauthController.js')
const slackController = require('../controllers/slackController.js')

// enables developer to access .env file
dotenv.config();

// enables user to use cookie sessions
router.use(
  cookieSession({
    secret: 'mainSecret',
  })
);

// github oauth variables
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const callback_url = 'https://kafkapeek.herokuapp.com/auth/github/callback';

// redirects to github oauth authorization page
router.get('/github', (req, res, next) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${callback_url}`;
  return res.redirect(url);
});

// retrieves user data to store it in a session
router.get('/github/callback',
  oauthController.githubData,
  async (req, res) => {

    // stores user data in current session
    req.session.name = res.locals.github.name;
    req.session.id = res.locals.github.id;
    req.session.login = res.locals.github.login;
    req.session.email = res.locals.github.email;
    req.session.token = res.locals.token

    // redirect user back to landing page with github token in params
    return res.redirect(`https://kafkapeek.herokuapp.com/?token=${req.session.token}`)
  });

// removes stored user data from current session
router.get('/logout', (req, res, next) => {
  req.session = null;

  // redirect back to landing page
  return res.redirect('https://kafkapeek.herokuapp.com');
});

// initial slack notification path
router.post('/form-submit',
  slackController.initialNote,
  slackController.checkingMetric,
  (req, res, next) => {

    // sends message to front-end when kafkapeek begins tracking new metric
    return res.status(200).send(`KafkaPeek now tracking metric ${req.body.label}`)
  })

module.exports = router;
