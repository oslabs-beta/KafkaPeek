const express = require('express');
const axios = require('axios');
const metricsObject = require('./utils.js')


module.exports = {

  async initialNote(req, res, next) {
    try {
      const time = new Date().toUTCString().slice(5, -4)
      axios.post('https://hooks.slack.com/services/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', {
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": " :wave: *You have a new alert:*\n\n You will begin to receive notifictions for the following:"
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
                "text": `*Threshold:*\n > ${req.body.threshold}`
              },
              {
                "type": "mrkdwn",
                "text": `*Assigned By:*\n - ${req.body.name}`
              }
            ]
          }
        ]
      })
        .then(() => {
          console.log('Form submitted successfully!');
        })
        .catch((error) => {
          console.log({error:error,message:'error inside axios'})
        });
      return next()
    } catch (error) {
      return next({ error, message: 'something went wrong sending slack message', log: 'middleware error in the initialNote function' });
    }
  },

  async checkingMetric(req, res, next) {
    metricsObject[req.body.value] = req.body.threshold
    return next()
  }
}
