interface Sources {
  intro: {
    start: number;
    end: number;
  };
  outro: {
    start: number;
    end: number;
  };
  sources: [
    {
      url: string;
      type: string;
      isM3U8: boolean;
    }
  ];
  tracks: [
    {
      file: string;
      label?: string;
      kind: string;
      default: boolean;
    }
  ];
  server: 4;
}

interface Episode {
  id: string;
  title: string;
  episodeId: number;
  number: number;
}

interface AnilistAnime {
  Page: {
    media: {
      id: number;
      title: {
        english: string;
        native: string;
      };
    }[];
  };
}

interface IServers {
  sub: Array<{
    serverId: string;
    serverName: string;
  }>;
  dub: Array<{
    serverId: string;
    serverName: string;
  }>;
}
