const { Client, IntentsBitField, EmbedBuilder } = require('discord.js'); // Discord.js library for creating a bot client and other utilities.
const { mainChannel, sourceChannels, devs } = require('../config.json'); // Configuration file for defining channel and user IDs.
const dotenv = require('dotenv'); // dotenv library for loading environment variables.
dotenv.config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.once('ready', c => {
  console.log(`${c.user.tag} is ready.`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  // Check if the user is authorized (included in the devs array).
  if (!devs.includes(interaction.member.id)) {
    interaction.reply({
      content: 'Not enough permissions.',
      ephemeral: true,
    });
    return;
  }

  if (interaction.commandName === 'pins') {
    try {
      const targetChannel = await client.channels.fetch(mainChannel);

      // Iterate over each source channel to fetch pinned messages
      for (const sourceChannel of sourceChannels) {
        const channel = await client.channels.fetch(sourceChannel);
        const pinnedMessages = await channel.messages.fetchPinned();

        // Iterate over each pinned message.
        for (const message of pinnedMessages.values()) {
          const embed = new EmbedBuilder()
            .setTitle(`From: ${message.author.username}`)
            .setDescription(message.content)
            .addFields({ name: 'From Channel:', value: `#${channel.name}` })
            .setColor('Random');

          // Send the embed to the target channel.
          await targetChannel.send({ embeds: [embed] });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
});

client.login(process.env.BOT_TOKEN);
