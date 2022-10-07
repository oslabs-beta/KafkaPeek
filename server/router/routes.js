const express = require('express');
// const passport = require('passport');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const cookieSession = require('cookie-session');
const oauthController = require('../controllers/oauthController.js')
// import { Navigate } from 'react-router-dom';

// const cookie_secret = process.env.COOKIE_SECRET;

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

router.get('/data',(req,res)=>{
  return res.status(200).send({
    name: req.session.name,
    id: req.session.id,
    login: req.session.login,
    email: req.session.email
  })
})

//http://localhost/4000/auth/logout/
router.get('/logout', (req, res) => {
  req.session = null;
  console.log(req.session);
  return res.redirect('http://localhost:8080');
});



module.exports = router;
