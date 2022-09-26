const TWITCH_API_ENDPOINT = `https://api.twitch.tv/helix/`;
const clientId = process.env.TWITCH_CLIENT_ID as string;

export const deleteMessage = async (
  message_id: string,
  streamer_id: string,
  moderator_id: string,
  token: string
) => {
  const url =
    TWITCH_API_ENDPOINT +
    "moderation/chat?" +
    new URLSearchParams({
      broadcaster_id: streamer_id,
      moderator_id: moderator_id,
      message_id: message_id
    });

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Client-Id": clientId,
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status === 204) {
    return { res: "Message Deleted" };
  }

  if (response.status === 404) {
    return {
      res: "Message not found"
    };
  }

  if (response.status === 401) {
    return {
      res: "You are not authorized to use this command!"
    };
  }

  return response;
};

export const timeoutUser = async (
  user_id: string,
  streamer_id: string,
  moderator_id: string,
  token: string,
  time = 300,
  reason = ""
) => {
  const url =
    TWITCH_API_ENDPOINT +
    "moderation/bans?" +
    new URLSearchParams({
      broadcaster_id: streamer_id,
      moderator_id: moderator_id
    });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Client-Id": clientId,
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      user_id: user_id,
      duration: time,
      reason: reason
    })
  });

  if (response.status === 200) {
    return { res: "User timed out successfully" };
  }

  if (response.status === 401) {
    return {
      res: "You are not authorized to use this command!"
    };
  }

  return response;
};

export const banUser = async (
  user_id: string,
  streamer_id: string,
  moderator_id: string,
  token: string,
  reason = ""
) => {
  const url =
    TWITCH_API_ENDPOINT +
    "moderation/bans?" +
    new URLSearchParams({
      broadcaster_id: streamer_id,
      moderator_id: moderator_id
    });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Client-Id": clientId,
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      user_id: user_id,
      reason: reason
    })
  });

  if (response.status === 200) {
    return { res: "User banned successfully" };
  }

  if (response.status === 401) {
    return {
      res: "You are not authorized to use this command!"
    };
  }

  return response;
};
