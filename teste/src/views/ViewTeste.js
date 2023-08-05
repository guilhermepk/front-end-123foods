import { Link } from "react-router-dom";

const ViewTeste = () => {
    const teste = () => {
        return console.log('oi')
    }

    return (
        <div>
            <Link to="/">Home</Link>
            <br/>
            <button onClick={teste}>Clique aqui</button>
            <p className="pa"> 2 pa </p>
        </div>
    );
}

export default ViewTeste;