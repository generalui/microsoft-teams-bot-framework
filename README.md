## Prerequisites

- [Node.js](https://nodejs.org) version 10.14.1 or higher

  ```bash
  # determine node version
  node --version
  ```

## To run the bot

- Install modules

  ```bash
  npm install
  ```

- Start the bot

  ```bash
  npm start
  ```

## Testing the bot using Bot Framework Emulator

[Bot Framework Emulator](https://github.com/microsoft/botframework-emulator) is a desktop application that allows bot developers to test and debug their bots on localhost or running remotely through a tunnel.

- Install the Bot Framework Emulator version 4.3.0 or greater from [here](https://github.com/Microsoft/BotFramework-Emulator/releases)

### Connect to the bot using Bot Framework Emulator

- Launch Bot Framework Emulator
- File -> Open Bot
- Enter a Bot URL of `http://localhost:3978/api/messages`

### Deploy the bot to Azure and microsoft teams

- Create and configure an azure resource.
  1. Create a bot services resource
     2.Global Location
  2. Multi tenant type
  3. Within the certificates and secrets screen create a new secret and copy the unique value
  4. Within the configuration screen, put the end-point of our nodejs server <url>/api/messages in the connection point
  5. On the channels screen add Microsoft teams.
  6. Then click on get codes to insert bot and copy the bot id.
- Inside our nodejs project write the values ​​inside .env. The values ​​we need are:
  1. MicrosoftAppType=Microsoft.BotService/botServices
  2. MicrosoftAppId= application id
  3. MicrosoftAppPassword=secret value
     4.MicrosoftAppTenantId=
  4.
- Create a developer account in Microsoft 365 and create a Microsoft Teams work environment.
- Visit the Microsoft Teams developer portal and create a Microsoft Teams app. We can configure it to use it only in our company
- Inside our newly created application, we visit basic info and enter our application client id and put our azure resource id.
- We can modify our bot permissions as we wish
- Post.
- Within Microsoft teams we search the store for our newly created app.

## Further reading

- [Bot Framework Documentation](https://docs.botframework.com)
- [Bot Basics](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0)
- [Dialogs](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-dialog?view=azure-bot-service-4.0)
- [Gathering Input Using Prompts](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-prompts?view=azure-bot-service-4.0)
- [Activity processing](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-activity-processing?view=azure-bot-service-4.0)
- [Azure Bot Service Introduction](https://docs.microsoft.com/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0)
- [Azure Bot Service Documentation](https://docs.microsoft.com/azure/bot-service/?view=azure-bot-service-4.0)
- [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest)
- [Azure Portal](https://portal.azure.com)
- [Language Understanding using LUIS](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/)
- [Channels and Bot Connector Service](https://docs.microsoft.com/en-us/azure/bot-service/bot-concepts?view=azure-bot-service-4.0)
- [TypeScript](https://www.typescriptlang.org)
- [Restify](https://www.npmjs.com/package/restify)
- [dotenv](https://www.npmjs.com/package/dotenv)
