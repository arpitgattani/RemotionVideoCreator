import { AbsoluteFill, Img } from "remotion";

type Props = {
  url: string;
};

const BackgroundImageComponent = ({ url }: Props) => {
  if (!url) return null;
  return (
    <AbsoluteFill>
      <Img
        src={url}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
      />
    </AbsoluteFill>
  );
};

export default BackgroundImageComponent;
