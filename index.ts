import dotenv from "dotenv";
dotenv.config();
import { input, rawlist, select } from "@inquirer/prompts";
import figlet from "figlet";
import {
  getEpisodes,
  getServers,
  getSources,
  searchAnime,
} from "./src/methods";
import fs from "fs";
import http from "http";
import path from "path";
import ejs from "ejs";
import chalk from "chalk";

if (process.argv.length <= 2) {
  console.log(figlet.textSync("aniCLI", "Alligator"));
}

// server

const startServer = async (port: number, src: string) => {
  const server = http.createServer((req, res) => {
    if (req.url === "/") {
      const htmlTemplate = fs.readFileSync(
        path.join(__dirname, "/src/views/index.ejs"),
        "utf-8"
      );
      const renderedHtml = ejs.render(htmlTemplate, { srcUrl: src });
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(renderedHtml);
    }
  });

  server.listen(port, () =>
    console.log(
      chalk.greenBright(`Playback started on http://localhost:${port}/`)
    )
  );
};

// Your CLI logic goes here...

async function main() {
  console.log("\n\n");
  const searchTerm = await input({
    message: "Search your anime: ",
  });

  const searchData = await searchAnime(searchTerm);

  const selectedAnime = await rawlist({
    message: "Select your anime",
    choices: searchData.Page.media.map((a) => ({
      value: a.id,
      name: a.title.english || a.title.native,
    })),
  });

  const episodes: Episode[] = await getEpisodes(selectedAnime as number);
  const selectedEpNum = await input({
    message: "Episode number: ",
    validate: (val) => {
      if (Number(val) > episodes.length) return "Episode doesn't exists !";
      return true;
    },
  });
  const episode = episodes.find((e) => e.number === Number(selectedEpNum));
  const subOrDub: string = await select({
    message: "Sub or Dub ?",
    choices: [
      {
        name: "sub",
        value: "sub",
      },
      {
        name: "dub",
        value: "dub",
      },
    ],
  });

  const servers: IServers = await getServers(episode!.episodeId);
  const selectedServer = await select({
    message: "Choose a server: ",
    choices: servers[subOrDub as keyof IServers].map((s) => ({
      name: s.serverName,
      value: s.serverId,
    })),
  });

  const sources: Sources = await getSources(selectedServer, episode!.episodeId);

  startServer(5000, sources.sources[0].url);
}

main();
