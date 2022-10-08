const express = require('express');
const axios = require('axios');



module.exports = {

async initialNote (req,res,next){
    try{
        const time = new Date().toUTCString().slice(5,-4)
        axios.post('https://hooks.slack.com/services/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',{
            "blocks": [
              {
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": " :wave: You have a new alert:\n\n*A new metric has been set for notifications* \n *Your contact channel will be subcribed for the following:*"
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
              }
            ]
          })
            .then(()=>{
                console.log('Form submitted successfully!')
            })
            .catch((error)=>{
                console.log(error)
            });
        return next()
    }catch(error){
        return next({error, message: 'something went wrong sending Slack message', log: 'middleware error in the initialNote function'});
    }
  }
}

// -------- helper section --------------------------------------------------------

//   const intialMessage = {
//     "blocks": [
//       {
//         "type": "section",
//         "text": {
//           "type": "mrkdwn",
//           "text": " :wave: You have a new alert:\n\n*A new metric has been set for notifications* \n *Your contact channel will be subcribed for the following:*"
//         }
//       },
//       {
//         "type": "section",
//         "fields": [
//           {
//             "type": "mrkdwn",
//             "text": `*Metric:*\n ${req.body.label}`
//           },
//           {
//             "type": "mrkdwn",
//             "text": `*Subscribed :*\nSubmitted ${time}`
//           },
//           {
//             "type": "mrkdwn",
//             "text": "*Threshold:*\n1800"
//           },
//           {
//             "type": "mrkdwn",
//             "text": `*Assigned By:*\n - ${req.body.name}`
//           }
//         ]
//       }
//     ]
//   }