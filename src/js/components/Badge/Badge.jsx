const Badge = ({ type }) => {
    console.log(type)
    const badgeStyle = {
        backgroundColor: type.color,
    }
    return (
      <span style={badgeStyle} className={`badge`}>
        {type.abreviatura}
      </span>
    );
};

export default Badge;