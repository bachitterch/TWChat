const TWITCH_API_ENDPOINT = `https://api.twitch.tv/helix/`;
const clientId = process.env.TWITCH_CLIENT_ID as string;

export const getUser = async (streamerName: string, token: string) => {
  const url =
    TWITCH_API_ENDPOINT +
    "users?" +
    new URLSearchParams({
      login: streamerName
    });

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Client-Id": clientId,
      Authorization: `Bearer ${token}`
    }
  });

  const { data } = await response.json();

  return data;
};

export const getFollowedStreams = async (
  userId: string,
  token: string,
  limit = 100
) => {
  const url =
    TWITCH_API_ENDPOINT +
    "streams/followed?" +
    new URLSearchParams({
      user_id: userId,
      first: limit.toString()
    });

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Client-Id": clientId,
      Authorization: `Bearer ${token}`
    }
  });

  return await response.json();
};

export const getStream = async (streamerId: string, token: string) => {
  const url =
    TWITCH_API_ENDPOINT +
    "streams?" +
    new URLSearchParams({
      user_id: streamerId
    });

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Client-Id": clientId,
      Authorization: `Bearer ${token}`
    }
  });

  const { data } = await response.json();

  return data;
};
