interface IProps {
  url: string;
  height: string;
  width: string;
}

function getId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}

export const YTEmbed = (props: IProps) => {
  const { url, height, width } = props;

  const vidId = getId(url);

  const opts = {
    height,
    width,
  };

  return <div className="yt-embed">
    <iframe width="100%" height="425px" src="//www.youtube.com/embed/' 
    + videoId + '"></iframe>
  </div>;
};
