const ProductLister = () => {
    let content = null

    fetch('http://localhost:3000/foods')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });
}

export default ProductLister;