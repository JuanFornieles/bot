const { 
    Client, 
    GatewayIntentBits, 
    REST, 
    Routes, 
    SlashCommandBuilder, 
    Events 
} = require('discord.js');

require('dotenv').config();

// 👉 CLIENTE DEL BOT (ESTO ES LO QUE TE FALTABA)
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// 👉 COMANDOS SLASH
const commands = [
    new SlashCommandBuilder()
        .setName('info')
        .setDescription('Muestra información del bot')
        .toJSON()
];

// 👉 REGISTRADOR DE COMANDOS
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// 👉 CUANDO EL BOT ESTÁ LISTO
client.once(Events.ClientReady, async (c) => {
    console.log(`✅ Conectado como ${c.user.tag}`);

    // Registrar comandos SOLO en tu servidor (rápido)
    try {
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log('🚀 Slash command /info registrado');
    } catch (err) {
        console.error('❌ Error registrando comandos:', err);
    }
});

// 👉 RESPUESTA AL COMANDO
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'info') {
        await interaction.reply('📌 Bot funcionando correctamente en Render/Local ✔️');
    }
});

// 👉 LOGIN DEL BOT
client.login(process.env.TOKEN);