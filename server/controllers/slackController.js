const express = require('express');
const axios = require('axios');
const metricsObject = require('./utils.js');

module.exports = {

  // first middleware function when tracking a new metric
  async initialNote(req, res, next) {
    try {
      const time = new Date().toUTCString().slice(5, -4);

      // sends initial message to a designated slack-contact-channel using a webhook of your choice
      axios.post('/* developer can place designated slack webhook here */', {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: ' :wave: *You have a new alert:*\n\n You will begin to receive notifictions for the following:',
            },
          },
          {
            type: 'section',
            fields: [
              {
                type: 'mrkdwn',
                text: `*Metric:*\n ${req.body.label}`,
              },
              {
                type: 'mrkdwn',
                text: `*Subscribed :*\nSubmitted ${time}`,
              },
              {
                type: 'mrkdwn',
                text: `*Threshold:*\n > ${req.body.threshold}`,
              },
              {
                type: 'mrkdwn',
                text: `*Assigned By:*\n - ${req.body.name}`,
              },
            ],
          },
        ],
      })
        .then(() => {
          console.log('Form submitted successfully!');
        })
        .catch((error) => {
          console.log({ error, message: 'error inside axios' });
        });
      return next();
    } catch (error) {
      return next({ error, message: 'something went wrong sending slack message', log: 'middleware error in the initialNote function' });
    }
  },

  // middleware function used to update the reference object with threshold values
  async checkingMetric(req, res, next) {
    metricsObject[req.body.value] = req.body.threshold;
    return next();
  },
};
