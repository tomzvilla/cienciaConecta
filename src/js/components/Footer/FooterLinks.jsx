const FooterLinks = (props) => {
    const links = props.links
    return (
        <div className="footer-links">
            <h5 className="footer-links__title">{props.title}</h5>
            {links.map( (enlace, i) => ((
                    <a key={i} href={enlace.link} className="footer-links__link"> {enlace.titulo}</a>
                ))
                
            )}
            
            
        </div>
    );
}

export default FooterLinks;