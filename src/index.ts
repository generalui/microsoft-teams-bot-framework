// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { config } from "dotenv";
import * as path from "path";
import * as restify from "restify";

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const botbuilder = require("botbuilder");

// This bot's main dialog.
import { SimonBot } from "./bots/bot";

const { initializeApp } = require("firebase/app");
import { getDatabase, ref, set, onValue } from "firebase/database";
import { TurnContext } from "botbuilder";

/////
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsJ8oGBYOWbfXHKZLJ5OlTKykQUP10ziQ",
  authDomain: "genuidemo.firebaseapp.com",
  projectId: "genuidemo",
  storageBucket: "genuidemo.appspot.com",
  messagingSenderId: "815776003834",
  appId: "1:815776003834:web:49e269fa2b71c27ba57b43",
  databaseURL: "https://genuidemo-default-rtdb.firebaseio.com",
};
const app = initializeApp(firebaseConfig);

////
const ENV_FILE = path.join(__dirname, "..", ".env");
config({ path: ENV_FILE });

// Create HTTP server.
const server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\n${server.name} listening to ${server.url}`);
  console.log(
    "\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator"
  );
  console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about adapters.
const adapter = new botbuilder.BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword,
});

// Catch-all for errors.
adapter.onTurnError = async (context, error) => {
  // This check writes out errors to console log .vs. app insights.
  // NOTE: In production environment, you should consider logging this to Azure
  //       application insights.
  console.error(`\n [onTurnError] unhandled error: ${error}`);

  // Send a trace activity, which will be displayed in Bot Framework Emulator
  await context.sendTraceActivity(
    "OnTurnError Trace",
    `${error}`,
    "https://www.botframework.com/schemas/error",
    "TurnError"
  );

  // Send a message to the user
  await context.sendActivity("The bot encounted an error or bug.");
  await context.sendActivity(
    "To continue to run this bot, please fix the bot source code."
  );
};

// Create the main dialog.
const myBot = new SimonBot();
// my firebase conf
const database = getDatabase(app);
const notificationsRef = ref(database, "message");

let conversationReferences = {};
let adapterContext;
let currentUser;

// Listen for incoming requests.
server.post("/api/messages", (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    // Route to main dialog.
    await myBot.run(context);
    currentUser = context.activity.from.id;
    conversationReferences[currentUser] = TurnContext.getConversationReference(
      context.activity
    );
    adapterContext = context.adapter;
  });
});

// Attach an asynchronous callback to read the data at our posts reference
onValue(notificationsRef, async (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  if (adapterContext !== undefined && currentUser !== undefined) {
    await adapterContext.continueConversation(
      conversationReferences[currentUser],
      async (turnContext) => {
        await turnContext.sendActivity(data);
      }
    );
  }
});
