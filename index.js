const fs = require('fs');
const readline = require('readline');

async function Main() {
    let output = 'Citizen.CreateThread(function()\r\n';
    const fileStream = fs.createReadStream(__dirname + '/global.oxt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        if (line.includes('=')) {
            const l_split = line.split('=');
            output += `    AddTextEntry('${l_split[0].trim()}', '${l_split[1].trim().replace("'", "\\\'")}')\r\n`;
        }
    }

    output += 'end)';

    fs.writeFileSync(__dirname + '/vehicle_name.lua', output);
}

Main();
