import React from "react";
import './Footer.css'

export default function Footer () { 

    return(
        <div className="Footer">
            <div className="footer__1">
                <div className="footer-p">
                    <p>AVISO IMPORTANTE: Todo el contenido disponible en este sitio web,
                        tiene como único objetivo proporcionar información general 
                        procedente de la API consumida (Coingecko)</p>
                </div>
                <div className="footer__2">
                    <p>Crypto Stadistics</p>
                    <p>© 2022</p>
                </div>
            </div>
            <div className="footer__3">
                <p>Developed by</p>
            </div>
        </div>
    )
}
