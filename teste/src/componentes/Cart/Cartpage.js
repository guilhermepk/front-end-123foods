


const Cartpage=()=>{
    const [token, setToken] = useState(null);
      const [decodedToken, setDecodedToken] = useState(null);
    const userId = decodedToken?.sub;
    useEffect(() => {
        const storedToken = localStorage.getItem('payload');
        if (storedToken) {
          setToken(storedToken);
          const decodedToken = jwt_decode(storedToken);
          setDecodedToken(decodedToken);
        }
      }, []); 
    
      useEffect(() => {
        if (userId) {
          fetch(`http://localhost:3000/purchases/${userId}/previsto`)
            .then((response) => response.json())
            .then((data) => {
              setData(data);
            })
            .catch((error) => {
              console.error('Erro ao buscar dados:', error);
            });
        }
      }, [userId]);






    return(
        <div>
          <h1>Meu Carrinho de Compras</h1>
        </div>
    )
}
export default Cartpage;