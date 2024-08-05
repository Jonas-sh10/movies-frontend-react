import "./Footer.css";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import youtube from "../assets/youtube.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-about">
          <h4 className="footer-title">Sobre Nosotros</h4>
          <p className="footer-description">
            En MovieVerse, nos apasiona el cine y las series. Descubre, explora y disfruta de una amplia gama de títulos en nuestra plataforma.
          </p>
        </div>
        <div className="footer-links">
          <h4 className="footer-title">Enlaces Útiles</h4>
          <a href="/" className="footer-link">Inicio</a>
          <a href="/" className="footer-link">Sobre Nosotros</a>
          <a href="/" className="footer-link">Contacto</a>
          <a href="/" className="footer-link">FAQ</a>
        </div>
        <div className="footer-social">
          <h4 className="footer-title">Síguenos</h4>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="Facebook" className="footer-social-icon" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagram} alt="Instagram" className="footer-social-icon" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="Twitter" className="footer-social-icon" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <img src={youtube} alt="YouTube" className="footer-social-icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-bottom-text">© 2024 Movie Database. Todos los derechos reservados.</p>
        <div className="footer-bottom-links">
          <a href="#terms" className="footer-bottom-link">Términos y Condiciones</a>
          <a href="#privacy" className="footer-bottom-link">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
