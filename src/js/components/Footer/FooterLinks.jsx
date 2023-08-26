const FooterLinks = (props) => {
    const links = props.links
    return (
        <div className="footer-links">
            <h5 className="footer-links__title">{props.title}</h5>
            {links.map( (enlace, index) => ((
                    <a href={enlace.link} className="footer-links__link" key={index}> {enlace.titulo}</a>
                ))
                
            )}
            
            
        </div>
    );
}

export default FooterLinks;