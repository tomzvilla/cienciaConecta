import FooterLinks from "../FooterLinks/FooterLinks";
import FooterImagenes from "../FooterImagenes/FooterImagenes";
import FooterRedes from "../FooterRedes/FooterRedes";

const linksip = [ {"titulo":"Gestión Abierta", "link":"https://gestionabierta.cba.gov.ar/"}, 
                    {"titulo": "Portal de Transparencia", "link": "https://transparencia.cba.gov.ar/"},
                    {"titulo": "Declaraciones Juradas", "link": "http://www.cba.gov.ar/declaraciones-juradas/"},
                    {"titulo": "Boletín Oficial", "link": "https://boletinoficial.cba.gov.ar/"}     ]

const linkscc = [ {"titulo": "Prensa", "link": "https://prensa.cba.gov.ar/"}, 
                    {"titulo": "Atención al Ciudadano", "link": "https://www.cba.gov.ar/ciudadano/"},
                    {"titulo": "0800-888-1234", "link": "tel:0351 524-3000"},
                    {"titulo": "Apps", "link": "https://www.cba.gov.ar/ciudadano/"}     ]

const Footer = () => {

    return (
        <div className="footer">
            
            <FooterImagenes />
            <FooterLinks title="Informacion Pública" links={linksip}/>
            <FooterLinks title="Canales de Comunicación" links={linkscc}/>
            <FooterRedes />
        </div>
    );
}

export default Footer;