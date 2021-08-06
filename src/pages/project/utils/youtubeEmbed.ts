import axios from "axios";

export const getYoutubeEmbed = async (url: string) => {
  return await axios.get(
    `https://www.youtube.com/oembed?url=${url}&format=json`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
