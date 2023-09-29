const Badge = ({ type }) => {
    const badgeStyle = {
        backgroundColor: type?.color,
    }
    return (
      <span title={type?.nombre} style={badgeStyle} className={`badge`}>
        {type?.abreviatura}
      </span>
    );
};

export default Badge;