import React, { useState, useEffect } from "react";
import { Card, Col, Container, Pagination, Row } from "react-bootstrap";

const AdmProductLister = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    useEffect(() => {
        fetch('http://localhost:3000/foods')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.length > 0 ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <Container>
            <Row>
                {currentProducts.map(product => (
                    <Col key={product.id} xs={12} md={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={`http://localhost:3000/uploads/${product.images[0]?.path}`}
                                      onLoad={() => console.log(`Imagem carregada: /uploads/${product.images[0]?.path}`)}
                                      onError={() => console.log(`Erro ao carregar a imagem: /uploads/${product.images[0]?.path}`)}/>
                            <Card.Body>
                                <Card.Title>{`Nome: ${product.name}`}</Card.Title>
                                <Card.Text>{`Preço: ${product.price}`}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Pagination className="justify-content-center mt-4">
                {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );
}

export default AdmProductLister;