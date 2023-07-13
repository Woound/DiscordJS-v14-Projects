# PinPal

PinPal is a Discord bot that retrieves pinned messages from multiple channels and outputs them in the channel of the user's choice in embed form, saving time and providing easy access to important information.

## Features

- Fetches pinned messages from multiple channels.
- Outputs pinned messages in embed form in a specified channel.
- Customizable configuration for source channels and target channel.
- Role-based access control for bot commands.

## Usage

1. Invite the bot to your Discord server using the OAuth2 URL generated for your bot.
2. Make sure the bot has proper permissions to read messages, send messages, and manage messages in the desired channels.
3. Set up the configuration in the `config.json` and `process.env` files with the appropriate channel IDs, tokens and authorized roles.
4. Use the `/pins` command in Discord to retrieve pinned messages.
5. The bot will fetch the pinned messages from the source channels and output them in the target channel in embed form.
6. Only members with authorized roles will be able to use the /pins command.
