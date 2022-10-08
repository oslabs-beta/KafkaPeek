const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const cookieSession = require('cookie-session');
const oauthController = require('../controllers/oauthController.js')


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

// ------------------------------------------------- notifications -------------------------------------

router.post('/form-submit', (req,res,next)=>{
  console.log('can you check this',req.body)
  const time = new Date().toUTCString().slice(5,-4)
   axios.post('https://hooks.slack.com/services/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',{
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": " :wave: You have a new request:\n\n*A new metric has been set for notifications* \n *Your contact channel will be subcribed for the following:*"
        }
      },
      {
        "type": "section",
        "fields": [
          {
            "type": "mrkdwn",
            "text": `*Metric:*\n ${req.body.label}`
          },
          {
            "type": "mrkdwn",
            "text": `*Subscribed :*\nSubmitted ${time}`
          },
          {
            "type": "mrkdwn",
            "text": "*Threshold:*\n1800"
          },
          {
            "type": "mrkdwn",
            "text": `*Assigned By:*\n - ${req.body.name}`
          }
        ]
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "emoji": true,
              "text": "Approve"
            },
            "style": "primary",
            "value": "click_me_123"
          },
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "emoji": true,
              "text": "Deny"
            },
            "style": "danger",
            "value": "click_me_123"
          }
        ]
      }
    ]
  })
  .then(()=>{
    res.send('Form submitted successfully!')
  })
  .catch((error)=>{
    console.log(error)
    res.send('Form submission failed!')
  });
  return
})

  // axios.post('https://hooks.slack.com/services/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', {
  //   "blocks": [
  //     {
  //       "type": "section",
  //       "text": {
  //         "type": "plain_text",
  //         "emoji": true,
  //         "text": "Looks like you have a conflict with these metrics:"
  //       }
  //     },
  //     {
  //       "type": "divider"
  //     },
  //     {
  //       "type": "section",
  //       "text": {
  //         "type": "mrkdwn",
  //         "text": "*cluster-demo / kafka-broker*\n BytesInPerSec Rate: 1900\n*cluster-demo / kafka-broker*\nBytesOutPerSec Rate: 1780"
  //       },
  //       "accessory": {
  //         "type": "image",
  //         "image_url": "https://freesvg.org/img/1538316074.png",
  //         "alt_text": "alert icon"
  //       }
  //     },
  //     {
  //       "type": "divider"
  //     },
  //     {
  //       "type": "context",
  //       "elements": [
  //         {
  //           "type": "image",
  //           "image_url": "https://api.slack.com/img/blocks/bkb_template_images/notificationsWarningIcon.png",
  //           "alt_text": "notifications warning icon"
  //         },
  //         {
  //           "type": "mrkdwn",
  //           "text": "*Conflicts with metrics going over threshold: 1600*"
  //         }
  //       ]
  //     },
  //     {
  //       "type": "context",
  //       "elements": [
  //         {
  //           "type": "plain_text",
  //           "text": `Assigned By: ${req.session.name}`,
  //           "emoji": true
  //         }
  //       ]
  //     }
  //   ]
  // })
  // .then(()=>{
  //   res.send('Form submitted successfully!')
  // })
  // .catch(()=>{
  //   res.send('Form submission failed!')
  // });




module.exports = router;
