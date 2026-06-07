const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('oposiciones')
        .setDescription('Información sobre oposiciones'),

    async execute(interaction) {

        // 🔥 IMPORTANTE: evita error 10062
        await interaction.deferReply();

        const ahora = new Date();

        const embed = new EmbedBuilder()
            .setTitle('📚 OPOSICIONES')
            .setColor(0x2b90d9)
            .addFields(
                {
                    name: '📅 Fecha',
                    value: ahora.toLocaleDateString('es-ES'),
                    inline: true
                },
                {
                    name: '🕒 Hora',
                    value: ahora.toLocaleTimeString('es-ES'),
                    inline: true
                },
                {
                    name: 'ℹ️ Info',
                    value: 'Preparación activa de oposiciones',
                    inline: false
                }
            )
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    }
};
