const dotenv = require('dotenv');
dotenv.config();

const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'pins',
    description: 'Retrieves all pins from source channels.',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered succesfully.');
  } catch (error) {
    console.log(error);
  }
})();
