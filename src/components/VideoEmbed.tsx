import { useEffect } from "react";

import Twitch from "@lib/embed";

const TwitchEmbed = ({ channel }: any) => {
  const targetID = "twitch-embed";

  useEffect(() => {
    const player = new Twitch.Player(targetID, {
      channel: channel
    });
    player.setVolume(0.5);
  }, [channel]);

  return (
    <>
      <div id={targetID}></div>
    </>
  );
};

export default TwitchEmbed;
