// eslint-disable-next-line react/prop-types
export const YoutubeEmbed = ({ link }) => {
  return (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={link}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={false}
        title="Embedded youtube"
      />
    </div>
  );
};
