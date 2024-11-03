const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0FOYW5BVUlKTW9hb2FnNEszRWlIaHlaSHh0cjM3K0hZNmtTNzFwOGMxRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL0VMT1dUQ05qdTcwNWJNZWhXek5GOEI5ZUx2ZjI4bmZzMzhpYVhIUWlHND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlUERxMmk3bUF0VUVkUzFiTFY5N3ovZy85N1Z4dUdSdGFMU0RJU2xjUFVRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrK0E4Zno0cW5ndC80bFlZMVlTanFHN3FZUzBCK0NUL3duRDd0azkrcUN3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlPR1RGRmxtdHcyNWU2YVA3U0dNVDRrZFBjZDNtbVNjdXNlekFEdWpSMGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZjUXRPQmpEdi8vZm5GTS9vR25qanR2cTNlM2lnUlY2d2REa3A0MHVjM1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUZzQXRSWVhrb1g5c1MwM2hkU0Rhc093RzBEOVIvTTU0N1F4cnUzMGZYZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieGdRZmdvVXBLQlBxM3ZWbitMRVdRekZRMmFDOTEzMEYxeEd3dXF3SGduZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InoyVGI4WFYxTndRTm4xaWFYUktnZVRyaHpXWGNyamR3THJRUWVtSUVFZ2t0QzBvZGJ1d1NhTDN3WUt6R0NDVmRhdGhjUzdHNmZKSGdRbktueDlaaUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI5LCJhZHZTZWNyZXRLZXkiOiJHYktZRWNwcnZHaG5oank1YW50WFoxVFl2ZmYrNjlsWHdUMGhtcjlWZ0F3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJxbG5jU0lic1FsQzlaYXNMczk5Nm9RIiwicGhvbmVJZCI6ImMzNzM2MGEyLTY5MTYtNDRkMS1hMjg3LWMxZThlYTE3NTE3MyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnVy9hV04zUUZ5alJYTTE5YmlmZEp2VE4xZkk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUWlSNjNqUGxHeWlzUVVaZWhwTTRLQktLKytBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkczMVBQWjczIiwibWUiOnsiaWQiOiIyMzQ4MTA5MjQzNjE4OjQxQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNMnkxODhFRUx6WW5ya0dHQThnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJXTDJSNTlFcUIxOUhTeFhRenp2UkVtNWtyTVRRb1VIZ2EyT2pDUE5YcWpnPSIsImFjY291bnRTaWduYXR1cmUiOiI1QmVldDRMSTdmTUs4a283b2Z0MUpOUndzUFI3aE1EcEFuU1RxWFBWQklkSVhwaHp5RUgvZGE0cC9YMGhPclZCZ1hIbmtVRXJycGN2RHFSemlFK3NBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTjBqeDlKNDdjUmNHNEIwSE0wS1VoSlQ0dlRZOE5ZOG5FaFdxcUtlU1pYaEZSRlJ0VGVwdFl4Sm9qNmg4em1WRTFWUXl1QmpmSkZ1TkhvMHZESGhxRHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTA5MjQzNjE4OjQxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZpOWtlZlJLZ2RmUjBzVjBNODcwUkp1Wkt6RTBLRkI0R3Rqb3dqelY2bzQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzA2NTMyNTd9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
