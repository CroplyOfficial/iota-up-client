import YouTube from "react-youtube";

interface IProps {
  url: string;
  height: string;
  width: string;
}

export const YTEmbed = (props: IProps) => {
  const { url, height, width } = props;

  const opts = {
    height,
    width,
  };

  const vidId = url.split("?v=")[1].split("&")[0];
  return <YouTube videoId={vidId} opts={opts} />;
};
