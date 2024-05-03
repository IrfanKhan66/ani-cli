export const ANILIST_BASEURL = "https://graphql.anilist.co";

export const ANIME_SEARCH = `query ($search: String) {
  Page(page: 1, perPage: 10){
    media(search: $search, type: ANIME) {
      id
      title {
        romaji
        english
        native
        userPreferred
      }
    }
  }
}`;

export const ANIME_QUERY = `query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
      userPreferred
    }
  }
}`;
