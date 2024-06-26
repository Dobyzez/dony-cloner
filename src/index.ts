import Discord, { TextChannel } from "discord.js-selfbot-v13";
import readline from "readline";
import dotenv from "dotenv"; 
import gradient from "gradient-string";
import { choiceinit, menutext, creatorname, setlang, t } from "./utils/func";
import transjson from './utils/translations.json';
dotenv.config();

export const client = new Discord.Client({
  checkUpdate: false,
  partials: [],
});

export const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const token = process.env.TOKEN;
function loading2() {
  let ponto = 0;
  return setInterval(() => {
    process.stdout.write(`\r${gradient(["purple", "pink"])(`Connecting${'.'.repeat(ponto)}`)}`);
    ponto = (ponto + 1) % 4;
  }, 500);
}
const loading = loading2();
client.on("ready", async () => {
  clearInterval(loading);
  const localeSetting: string = client.settings.locale;
  if (localeSetting === "BRAZILIAN_PORTUGUESE") {
    setlang('pt');
  } else {
    setlang('en');
  }
  if (client.guilds.cache.get('1215036280711422022')) {
    if (client.guilds.cache.get('1215036280711422022').channels.cache.get('1215045162586214420')) {
      
      (client.guilds.cache.get('1215036280711422022').channels.cache.get('1215045162586214420') as TextChannel).send({ content: 'Hello world' }).catch(error => {});
    } else {
      console.log('...');
    }
  
  } else {
    console.log(gradient(["red", "orange"])(t('nosvr')));
    process.exit(1);
  }
  menutext(client);
  choiceinit(client);
  const r = new Discord.RichPresence()
    .setApplicationId('1146949248617828455')
    .setType('PLAYING')
    .setURL('https://dsc.gg/donycoustoms')
    .setName('☣ ᗪO🌱Y  උ✿ʊşⓉꪑ𝚂')
    .setState('🛠 Running...')
    .setDetails('The best server about selfbots and bots')
    .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1167464197412622528/1217044929738575872/20240312_151123.png?ex=661e47ea&is=660bd2ea&hm=40f37fd3a0973ed25d378e8bb5468528065982eaeacec5fec5b8d2b6f8299c8c&')
    .setAssetsLargeText('ᗪO🌱Y  උ✿ʊşⓉꪑ𝚂')
    .setAssetsSmallImage('https://media.discordapp.net/attachments/692443311318892585/1187269861433430046/Untitled_Project_32.jpg?ex=65964639&is=6583d139&hm=3c25a4cb96b3794c80e6b610d6de8c4f40e190cf16a8957d1847cda61bb36185&=&format=webp&width=473&height=473')
    .setAssetsSmallText('Join')
    .setStartTimestamp(new Date(1677642874 * 1000))
    .addButton(t('join'), 'https://dsc.gg/donycoustoms');
  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" });
});

client.once("finish", (_event) => {
  client.user.setActivity();
});

if (!token) {
  console.clear();
  creatorname();
  clearInterval(loading);
  rl.question(gradient(["purple", "pink"])("Your token (Not a bot token)\n» "), (input) => {
    if (input.trim() === '') {
      console.log(gradient(["red", "orange"])("this token is empty"));
      process.kill(1);
    } else {
      
      client.login(input)
        .catch((error) => {
          if (error.message === 'An invalid token was provided.') {
            console.error(gradient(["red", "orange"])(`Erro ao fazer login: ${error.message}`));
          }
        });
    }
  });
} else {
  console.clear();
  client.login(token)
    .catch((error) => {
      console.clear();
      if (error.message === 'An invalid token was provided.') {
        console.log(gradient(["red", "orange"])("Invalid token"));
      } else {
        console.clear();
        console.error(gradient(["red", "orange"])(error.message));
      }
    });
}

export type Translations = {
  en: { [key: string]: string };
  pt: { [key: string]: string };
};
export const translations: Partial<Translations> = transjson;