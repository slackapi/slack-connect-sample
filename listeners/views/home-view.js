
const homeBlocks = async(ack, view, body, client) => {
  
    let homeBlocks = [
       {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*Welcome To the Slack Connect Admin app :sparkles: :sparkles: * \n Here is a list of features you can try out to understand how the <https://api.slack.com/apis/connect#invite|Slack Connect APIs> can be used to automate admin tasks."
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*<https://api.slack.com/apis/connect#invite|Step 1: Invite users and make Slack Connect channels>*"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*<https://api.slack.com/apis/connect#accept|Step 2: Accept Invitations>*"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*<https://api.slack.com/apis/connect#approve|Step 3: Approve and Decline Invitations>* "
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "*<https://api.slack.com/apis/connect#disconnect|Step 4: Disconnect Slack Connect channels>*"
        }
      }
    ]
    return homeBlocks
  };
  
  module.exports = { homeBlocks };