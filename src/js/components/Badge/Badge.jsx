const Badge = (props) => {
    const badgeStyle = {
        backgroundColor: props.type?.color,
    }
    return (
      <span title={props.type?.nombre} style={badgeStyle} className={props.className ? props.className : `badge`}>
        {props.type?.abreviatura}
      </span>
    );
};

export default Badge;