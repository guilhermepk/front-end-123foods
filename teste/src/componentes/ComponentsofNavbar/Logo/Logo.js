const Logo = () => {
    const path = `${process.env.PUBLIC_URL}/imagens/logoSemFundo.png`;

    return(
        <div className="logo">
            <a href='/'>
                <img src={path} alt="Logo" className="logo-123"/>
            </a>
        </div>
    );
}

export default Logo;