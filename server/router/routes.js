const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const axios = require('axios');
const cookieSession = require('cookie-session');
const oauthController = require('../controllers/oauthController.js')
const slackController = require('../controllers/slackController.js')
dotenv.config();
router.use(
  cookieSession({
    secret: 'mainSecret',
  })
);

// variables
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const callback_url = 'http://localhost:4000/auth/github/callback';

// oauth
router.get('/github', (req, res, next) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${callback_url}`;
  return res.redirect(url);
});

router.get('/github/callback',
  oauthController.githubData,
  async (req, res) => {
    req.session.name = res.locals.github.name;
    req.session.id = res.locals.github.id;
    req.session.login = res.locals.github.login;
    req.session.email = res.locals.github.email;
    req.session.token = res.locals.token
    return res.redirect(`http://localhost:8080/?token=${req.session.token}`)
  });

router.get('/data', (req, res) => {
  return res.status(200).send({
    name: req.session.name,
    id: req.session.id,
    login: req.session.login,
    email: req.session.email
  })
})

router.get('/logout', (req, res, next) => {
  req.session = null;
  return res.redirect('http://localhost:8080');
});

// slack notifications
router.post('/form-submit',
  slackController.initialNote,
  slackController.checkingMetric,
  (req, res, next) => {
    return res.status(200).send(`Zurau now tracking metric ${req.body.label}`)
  })

module.exports = router;
