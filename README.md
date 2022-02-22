# Slack Connect Admin App

This project aims to speed up the time to understand & implement an app using Slack Connect APIs.

It is meant to be a blueprint app which others can take and build their own automations into.

## Installation

#### Create a Slack App

1. Open [https://api.slack.com/apps/new](https://api.slack.com/apps/new) and choose "From an app manifest"
2. Choose the workspace you want to install the application to
3. Copy the contents of [manifest.json](./manifest.json) into the text box that says `*Paste your manifest code here*` (within the JSON tab) and click _Next_
4. Review the configuration and click _Create_
5. Click _Install to Workspace_ and _Allow_ on the screen that follows. You'll then be redirected to the App Configuration dashboard.

#### Environment Variables

Before you can run the app, you'll need to store some environment variables.

1. Copy `.env.sample` to `.env`
2. Open your apps configuration page from [this list](https://api.slack.com/apps), click _OAuth & Permissions_ in the left hand menu, then copy the _Bot User OAuth Token_ into your `.env` file under `SLACK_BOT_TOKEN`
3. Click _Basic Information_ from the left hand menu. There, in the `App Credentials` you should see your `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, and `SLACK_SIGNING_SECRET`. Click on `Show` and copy and paste those values into your `.env` file.
4. This app uses (the free version of) MongoDB. You'll need to provide your MongoDB username, password, and database name in the `.env` file: `DB_USERNAME`, `DB_PASSWORD`, and `DB_NAME`. You can 
feel free to leave the DB_NAME as `slack_connect_test`.

Below, you can see a screenshot of my database configuration. The `DB_NAME` is `slack_connect_test` 
and the collection is named `users`. 

![Screen Shot 2022-02-22 at 11 05 10 AM](https://user-images.githubusercontent.com/10428517/155201340-b6b77e0d-e49b-41c9-a26f-f24c1eb419a2.png)

> Don't forget to save your `.env` and then run 
```source .env``` to set your env variables. 

#### Install Dependencies

`npm install`

#### Run Bolt Server

`npm start`
<!-- 
## Project Structure

### `manifest.json`

`manifest.json` is a configuration for Slack apps. With a manifest, you can create an app with a pre-defined configuration, or adjust the configuration of an existing app.

### `app.js`

`app.js` is the entry point for the application and is the file you'll run to start the server. This project aims to keep this file as thin as possible, primarily using it as a way to route inbound requests.

### `/listeners`

Every incoming request is routed to a "listener". Inside this directory, we group each listener based on the Slack Platform feature used, so `/listeners/shortcuts` handles incoming [Shortcuts](https://api.slack.com/interactivity/shortcuts) requests, `/listeners/views` handles [View submissions](https://api.slack.com/reference/interaction-payloads/views#view_submission) and so on.

## App Distribution / OAuth

Only implement OAuth if you plan to distribute your application across multiple workspaces. A separate `app-oauth.js` file can be found with relevant OAuth settings.

When using OAuth, Slack requires a public URL where it can send requests. In this template app, we've used [`ngrok`](https://ngrok.com/download). Checkout [this guide](https://api.slack.com/tutorials/tunneling-with-ngrok) for setting it up.

Start `ngrok` to access the app on an external network and create a redirect URL for OAuth.

```
ngrok http 3000
```

This output should include a forwarding address for `http` and `https` (we'll use `https`). It should look something like the following:

```
Forwarding   https://3cb89939.ngrok.io -> http://localhost:3000
```

Navigate to **OAuth & Permissions** in your app configuration and click **Add a Redirect URL**. The redirect URL should be set to your `ngrok` forwarding address with the `slack/oauth_redirect` path appended. For example:

```
https://3cb89939.ngrok.io/slack/oauth_redirect
``` -->

# Steps

1. [Configure Interactivity, Events, and Redirect URLs](#step-1-configure-interactivity-events-and-redirect-URLs)
2. [Install the App](#step-2-install-the-app)
3. [Add the App to a Channel](#step-3-install-contract)
4. [Send a Slack Connect Invite using the App](#step-4-Instantiate-contract)
5. [Export Connection Details](#step-5-export-connection-details)
6. [Run the App](#step-5-run-the-app) 

## Step 1. Configure Interactivity, Events, and Redirect URLs

Follow the steps below based on if you plan to use Ngrok or Glitch as a way to host your app. Either will work.

If you are using [Ngrok](www.ngrok.com), make sure you have started up ngrok, and have updated your app with the ngrok forwarding address in the following places:
1. Update your event subscriptions request URL. It should look like the following: `https://3cb89939.ngrok.io/slack/events`. Save this.
2. Update your interactivity request URL. It should look like the following: `https://3cb89939.ngrok.io/slack/events`. Save this.
3. Go to OAuth & Permissions -> Redirect URLs. Add a new redirect URL. It should look like the following: `https://3cb89939.ngrok.io/slack/oauth_redirect`. Save the URL.

If you are using [Glitch](www.glitch.com), follow these instructions. To find your hosted URL in Glitch, open your project in the Glitch web IDE,
and then click on `Share`. From there you find the `Live site` link. Mine looks like the following: `https://bolt-template-slack-connect.glitch.me`

Once you've found the URL to your live site, update your app's configuration in the following places:
1. Update your event subscriptions request URL. It should look like the following: `https://bolt-template-slack-connect.glitch.me/slack/events`. Save this.
2. Update your interactivity request URL. It should look like the following: `https://bolt-template-slack-connect.glitch.me/slack/events/slack/events`. Save this.
3. Go to OAuth & Permissions -> Redirect URLs. Add a new redirect URL. It should look like the following: `https://bolt-template-slack-connect.glitch.me/slack/oauth_redirect`. Save the URL.

Great job! You're now ready to install the app using Slack's OAuth process. 

## Step 2. Install the App

Watch the video below to understand how to install the app. Note that the video is showing the install path from a Ngrok URL. 
The base URL will always we different, based on if you are using Ngrok or Glitch, and depending on what your app is named on Glitch / what forwarding address is used in Ngrok.

[![Install App via OAuth](https://user-images.githubusercontent.com/10428517/154159350-3e5ab314-d9f9-4c38-8d8a-122751d1cc51.png)](https://user-images.githubusercontent.com/10428517/155203611-ffa7b69a-9b6d-40d1-a33e-9ba622c0dfcf.mov)


Next, navigate to your install endpoint. Since we are using Bolt, this endpoint is automatically created for us from the Bolt package. 
1. If you are using Glitch (and assuming your app is hosted at `https://bolt-template-slack-connect.glitch.me`), you can navigate to `https://bolt-template-slack-connect.glitch.me/slack/install`
If you are using Ngrok, it should look something like `https://3cb89939.ngrok.io/slack/install`
2. Click on the `Add to Slack` button.
3. Pick a workspace to install the app to from the top-right corner.
4. Click on the green `Allow` button.
5. You will be redirected to the Redirect URL. Click on "Open Slack". 
6. Once you click on "Open Slack" your browser, you will be taken to the messages tab of your new Slack Connect Admin app! 🎉


## Step 3. Add the App to a Channel

Watch the video below to understand how to add the app to a channel. First, we 
create a new channel, then we add the app to that channel.

[![Add App to Channel](https://user-images.githubusercontent.com/10428517/155204764-789193f2-8cce-46aa-8268-508cf38195b9.png)](https://user-images.githubusercontent.com/10428517/155204315-2fa1b888-d479-494d-ae80-ebe59da02868.mov)

## Step 4. Send a Slack Connect Invite using the App

From there click on `Slack Connect Bot` from the `Apps` section of your sidebar on the left-hand side.

Next, click on the `Home` tab of the app. There you should see three buttons, `Send Invites`, `View Invitations` and `Disconnect Channels`.

Click on the `Send Invites` button.

In the modal which pops up, choose the channel which you've just added the Slack Connect Admin App to.

In the email section, choose the email which coressponds to the workspace which you want to start a shared channel with.

Leave the rest of the sections blank. Before you click on `Invite` your invite should look similar to the following: 

[![](https://user-images.githubusercontent.com/10428517/154171627-50b690e9-84b0-4697-968c-cc3bb7b9f55e.png)]()

Click on `Invite`.

## Step 5. Accept the Slack Connect Invite

Now, click on `List Invitations`. You should see the invitation which you've just created now show up. 

Click on the Invite ID at the top of the invitation to be taken to the invite. Select the email account 
associated with the workspace you want to accept the invite from. For me that is the account with `horeaporutiu1@gmail.com`.
Click through the following two pages. You can leave the defaults as is (Public channel, same channel name). Lastly,
click on `Join Channel`.

Now, if you click on `View Invitations again` you should see that the buttons have changed. Instead of seeing `Accept` and `Ignore`you will
now see `Approve` and `Deny`. 

## Step 6. Approve the Slack Connect Invite

Now, let's approve the invite. Click on the green `Approve` button next to the invite. After a few seconds, you should see that invite dissapear and then a 
new channel `test_sc_app` will be added under the `Connections` tab. 

## Step 7. Disconnect the Channel
Lastly, let's disconnect a channel when we are done using it. To do this, we will need a special, [admin scope](https://api.slack.com/scopes/admin.conversations:write). The main difference between
this scope and the other scopes we've requested in the past is that this endpoint reaches across 
an entire Enterprise Grid organization, not individual workspaces. This means it has a lot more 
power than the traditional scopes. **Installing this scope is only possible if you are logged in as an admin or Owner of your org.**

Once you are ready to install, navigate to the following endpoint: `www.example.com/slack/install/orgadmin`. Since I am using ngrok currently, my endpoint is: https://3015-98-51-61-120.ngrok.io/slack/install/orgadmin. Your base path will look different than mine.

Once you navigate to that endpoint, you should see a purple Add to Slack button. Once you click on that, you should be able to install the app **at the org level**. This means that it is normal to 
see organizations in the drop down, in addition to workspaces. This install will ONLY work on a valid 
organization which you are a Owner or admin of. Watch the video below to see the process in action.




 Click on the 
`Disconnect Channels` button. Select the channel `test_sc_app` and then 
click on `Disconnect`. 
Within a few seconds, you should see that channel move from the `Connections` section of the sidebar, to the `Channels` section



