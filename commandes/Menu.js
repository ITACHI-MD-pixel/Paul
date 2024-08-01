const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/itachi");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//itachi");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭─────────────────☉
│▫️╭─────────────☉
│  │ *ITACHI-MD-pixel*
│▫️│*BOT-OWNER* : ${s.OWNER_NAME}
│▫️│*Date* : ${date}
│▫️│*PREFIX* : ${s.PREFIXE}
│▫️│*WORKTYPE* : ${mode}
│▫️│*CMDs* : ${cm.length} 
│▫️│*STORAGE* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│▫️│*RUNNING ON* : ${os.platform()}
│▫️│*THEME* : *ITACHI-MD-pixel*
│▫️╰──────────────☉
╰──────────────────☉
╭───────────────☉
 ☉〘 ITACHI-MD-pixel 〙☉
 ☉by Paul Adedokun☉
╰───────────────☉\n`;
    
let menuMsg = `
╭─────────☉
    *AMATERASU,HAHA*
╰─────────☉

 *⚡ITACHI-MD-pixel COMMAND LIST⚡*
`;

    for (const cat in coms) {
        menuMsg += ` ╭──────☉ *${cat}* ☉─────▸`;
        for (const cmd of coms[cat]) {
            menuMsg += `
│▫️│ ${cmd}`;
        }
        menuMsg += `
╰────────────···▸▸ \n`
    }

    menuMsg += `
            
*———————————————————————————*
|▫️ITACHI-MD-pixel
|▫️a Multi device whatsapp bot
|▫️Created by _Paul Adedokun_
|▫️_Repo_ :https://github.com/ITACHI-MD-pixel
*———————————————————————————*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *ITACHI-MD-pixel*, déveloper Paul Adedokun" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *itachi*, déveloper Paul Adedokun" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
