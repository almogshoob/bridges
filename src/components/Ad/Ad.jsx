export const Ad = ({ img, title, link }) => {
  const openLink = () => {
    window.open(link, "_blank");
  };

  return (
    <div className="ad">
      <img src={img} onClick={openLink} />
      <h1>{title}</h1>
    </div>
  );
};
