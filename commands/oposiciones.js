const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('oposiciones')
        .setDescription('Información sobre las oposiciones'),

    async execute(interaction) {

        const ahora = new Date();

        const embed = new EmbedBuilder()
            .setTitle('📚 OPOSICIONES - INFORMACIÓN')
            .setColor(0x2b90d9)
            .setThumbnail('https://cdn-icons-png.flaticon.com/512/3135/3135768.png')
            .addFields(
                {
                    name: '📅 Fecha actual',
                    value: ahora.toLocaleDateString('es-ES'),
                    inline: true
                },
                {
                    name: '🕒 Hora actual',
                    value: ahora.toLocaleTimeString('es-ES'),
                    inline: true
                },
                {
                    name: '📌 Estado',
                    value: 'Convocatorias abiertas / en preparación (según región)',
                    inline: false
                },
                {
                    name: '🎯 Recomendación',
                    value: 'Estudiar diariamente y repasar temas clave.',
                    inline: false
                }
            )
            .setFooter({ text: 'Sistema de información de oposiciones' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
