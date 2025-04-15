const fs = require('fs');
const ews = require('ews-javascript-api');
require('dotenv').config();

const user = process.env.EXCHANGE_USER;
const pass = process.env.EXCHANGE_PASS;
// Configuração da conta Exchange 
const exch = new ews.ExchangeService(ews.ExchangeVersion.Exchange2010_SP2);
exch.Credentials = new ews.ExchangeCredentials('user', 'pass');
exch.Url = new ews.Uri('https://outlook.office365.com/EWS/Exchange.asmx');

async function main() {
    try {
        // Define a pasta onde vamos buscar os emails (Inbox)
        const view = new ews.ItemView(5); // Pega só os 5 primeiros
        const results = await exch.FindItems(ews.WellKnownFolderName.Inbox, view);

        const subjects = results.Items.map((item, index) => `${index + 1}. ${item.Subject}`).join('\n');

        // Escreve os assuntos no arquivo
        fs.writeFile('emails.txt', subjects, (err) => {
            if (err) throw err;
            console.log('Assuntos salvos no arquivo emails.txt!');

            // Lê o conteúdo do arquivo
            fs.readFile('emails.txt', 'utf8', (err, data) => {
                if (err) throw err;
                console.log('\nConteúdo do arquivo:\n' + data);
            });
        });
    } catch (err) {
        console.error('Erro:', err);
    }
}

main();

