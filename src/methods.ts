import axios from "axios";
import { ANILIST_BASEURL, ANIME_SEARCH } from "./constant";

export const searchAnime = async (search: string) => {
  try {
    const { data } = await axios.post(`${ANILIST_BASEURL}`, {
      query: ANIME_SEARCH,
      variables: {
        search,
      },
    });
    return data.data as AnilistAnime;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getEpisodes = async (id: number) => {
  try {
    const { data } = await axios.get(
      `${process.env.API_BASEURL}/anime/info/${id}`
    );
    return data.data.episodesList;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const getServers = async (epId: number) => {
  try {
    const { data } = await axios.get(
      `${process.env.API_BASEURL}/anime/servers/${epId}`
    );
    return data.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getSources = async (serverId: string, epId: number) => {
  try {
    const { data } = await axios.get(
      `${process.env.API_BASEURL}/anime/sources?serverId=${serverId}&episodeId=${epId}`
    );
    return data.data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
