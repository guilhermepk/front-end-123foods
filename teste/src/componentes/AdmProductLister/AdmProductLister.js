import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Modal from 'react-modal';

const AdmProductLister = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const initialProductsPerPage = 10;
    const [productsPerPage, setProductsPerPage] = useState(initialProductsPerPage);

    if (productsPerPage < 1) productsPerPage = initialProductsPerPage;

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
    }

    const Pag = () => {
        const totalPages = Math.ceil(products.length / productsPerPage);
        const visiblePages = 5;
        const half = Math.floor(visiblePages / 2);

        const getPageNumbers = () => {
            const pageNumbers = [];
            if (totalPages <= visiblePages) {
                for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                let start = currentPage - half;
                if (start < 1) start = 1;
                let end = start + visiblePages - 1;
                if (end > totalPages) {
                    end = totalPages;
                    start = end - visiblePages + 1;
                }
                for (let i = start; i <= end; i++) {
                    pageNumbers.push(i);
                }
            }
            return pageNumbers;
        }

        const pageNumbers = getPageNumbers()

        //botão de reticências
        const EllipsisButton = (props) => {
            

            return (
                <button
                    className='pageButton'
                >
                    ...
                </button>
            );
        }

        return (
            <div className="pagination">
                {pageNumbers[0] !== 1 && (
                    <EllipsisButton first={pageNumbers[0]}/>
                )}
                {getPageNumbers().map((pageNumber, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(pageNumber)}
                        className={pageNumber === currentPage ? 'currentPageButton' : 'pageButton'}
                    >
                        {pageNumber}
                    </button>
                ))}
                {pageNumbers[visiblePages-1] !== totalPages && (
                    <EllipsisButton last={pageNumbers[visiblePages-1]}/>
                )}
            </div>
        );
    }

    const handleInputChange = (event) => {
        const value = event.target.value;

        if (value?.trim().length > 0){
            setProductsPerPage(value);
        }
        else{
            setProductsPerPage(initialProductsPerPage);
        }
    }

    const handleInputFocus = (event) => event.target.select();

    // Hook que demonstra se a modal está aberta ou não
    const [modalIsOpen, setIsOpen] = React.useState(false);

    // Função que abre a modal
    function abrirModal() {
        setIsOpen(true);
    }

    // Função que fecha a modal
    function fecharModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <div>
                <button onClick={abrirModal}>Abrir modal</button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={fecharModal}
                    contentLabel="Modal de exemplo"
                >
                    <h2>Olá</h2>
                    <button onClick={fecharModal}>Fechar</button>
                    <div>Eu sou uma modal</div>
                </Modal>
            </div>
            <TableContainer>
                <Pag />
                <input
                    type="number"
                    value={productsPerPage}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Imagem </TableCell>
                            <TableCell> Nome </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {currentProducts && currentProducts.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell> img.png </TableCell>
                                <TableCell> {product.name} </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pag />
            </TableContainer>
        </div>
    );
}

export default AdmProductLister;