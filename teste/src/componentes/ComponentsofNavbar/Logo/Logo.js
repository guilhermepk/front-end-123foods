import { Link } from "react-router-dom";

const Logo = () => {
    const path = `${process.env.PUBLIC_URL}/imagens/logoSemFundo.png`;

    return(
        <div className="logo">
        <Link to="/"><img src={path} alt="Logo" className="logo-123"/></Link>
        </div>
    );
}

export default Logo;