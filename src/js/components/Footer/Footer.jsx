import FooterLinks from "./FooterLinks";
import FooterImagenes from "./FooterImagenes";
import FooterRedes from "./FooterRedes";
import { useEffect, useState } from "react";

const linksip = [ {"titulo":"Gestión Abierta", "link":"https://gestionabierta.cba.gov.ar/"}, 
                    {"titulo": "Portal de Transparencia", "link": "https://transparencia.cba.gov.ar/"},
                    {"titulo": "Declaraciones Juradas", "link": "http://www.cba.gov.ar/declaraciones-juradas/"},
                    {"titulo": "Boletín Oficial", "link": "https://boletinoficial.cba.gov.ar/"}     ]

const linkscc = [ {"titulo": "Prensa", "link": "https://prensa.cba.gov.ar/"}, 
                    {"titulo": "Atención al Ciudadano", "link": "https://www.cba.gov.ar/ciudadano/"},
                    {"titulo": "0800-888-1234", "link": "tel:0351 524-3000"},
                    {"titulo": "Apps", "link": "https://www.cba.gov.ar/ciudadano/"}     ]

const Footer = () => {
    const [resize, setResize] = useState(window.innerWidth <= 1000);

    const handleResize = () => {
        setResize(window.innerWidth <= 1000);
      };
    
      useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


    return (
            <>
            {!resize ?
                <div className="footer">
                    <FooterImagenes />
                    <FooterLinks title="Informacion Pública" links={linksip}/>
                    <FooterLinks title="Canales de Comunicación" links={linkscc}/>
                    <FooterRedes />
                </div>
                :
                <div className="footer footer--resize">
                    <div className="footer__images">
                        <FooterLinks title="Informacion Pública" links={linksip}/>
                        <FooterLinks title="Canales de Comunicación" links={linkscc}/>
                    </div>
                    
                    <div className="footer__images">
                        <FooterImagenes />
                        <FooterRedes />
                    </div>
                </div>
            }
        </>
    )
}

export default Footer;