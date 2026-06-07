const {
    Client,
    GatewayIntentBits,
    REST,
    Routes,
    SlashCommandBuilder,
    Events
} = require('discord.js');

require('dotenv').config();

// =======================
// CLIENTE DISCORD
// =======================
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// =======================
// COMANDOS
// =======================
const commands = [
    new SlashCommandBuilder()
        .setName('info')
        .setDescription('Información del bot')
        .toJSON()
];

// =======================
// REGISTRO DE COMANDOS
// =======================
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// =======================
// SERVIDOR WEB (IMPORTANTE EN REPLIT / RENDER)
// =======================
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Bot activo ✔️');
});

app.listen(3000, () => {
    console.log('🌐 Servidor web activo en puerto 3000');
});

// =======================
// BOT LISTO
// =======================
client.once(Events.ClientReady, async (c) => {
    console.log(`✅ Conectado como ${c.user.tag}`);

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

// =======================
// INTERACCIONES
// =======================
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    try {
        await interaction.deferReply();

        if (interaction.commandName === 'info') {
            await interaction.editReply('📌 Bot funcionando correctamente ✔️');
        }

    } catch (err) {
        console.error('❌ Error en interacción:', err);
    }
});

// =======================
// LOGIN
// =======================
client.login(process.env.TOKEN);
