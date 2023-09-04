
import Usermodal from '../Usermodal/Usermodal';
import jwt_decode from 'jwt-decode';
import '../Navigationbar/Navigationbar.css'
import {BsArrowLeftCircle} from 'react-icons/bs';
import Userprofile from '../Userprofile/Userprofile';
import Useraddress from '../Useraddress/Useraddress';
import Myshopping from '../Myshopping/Myshopping';
import Addressregister from '../Useraddress/UseraddressRegister';
import PurchasesHistoric from '../purchaseshistoric/purchaseshistoric';
import React, { useState, useEffect } from 'react';
import { useUserinfo } from '../Userinfo/Userinfo';


const Userpage=()=>{
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);
    const [token, setToken] = useState(null);
    const [decoded_token, setDecodedToken] = useState(null)
    const [showUserinf,setshowUserinf]=useState(true);
    const [showMyshoppins,setshowMyshoppins]=useState(false);
    const [showpurchasesHistoric,setshowpurchasesHistoric]=useState(false);
    const [ShowregisterAddress,setshowregisteraddress]=useState(false);
    const [Showaddress,setshowaddress]=useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    
    const userId = decoded_token?.sub; 
    const userInfo=useUserinfo(token,userId);
 useEffect(() => {
        const storedToken = localStorage.getItem('payload');
        if (storedToken) {
            setToken(storedToken);
            const decodedToken = jwt_decode(storedToken);
            setDecodedToken(decodedToken);
        }
    }, []);
    const handlemyshoppings=()=>{
        setshowMyshoppins(true)
        setshowaddress(false);
        setshowUserinf(false);
        setshowregisteraddress(false);
        setshowpurchasesHistoric(false)
    }
    const handlemyprofile=()=>{
        setshowMyshoppins(false)
        setshowaddress(false);
        setshowUserinf(true);
        setshowregisteraddress(false);
        setshowpurchasesHistoric(false)
    }

    const handlepurchasesHistoric=()=>{
        setshowMyshoppins(false)
        setshowpurchasesHistoric(true)
        setshowaddress(false);
        setshowUserinf(false);
        setshowregisteraddress(false)
    }

    const handleregisterAddress=()=>{
        setshowMyshoppins(false)
        setshowaddress(false);
        setshowUserinf(false);
        setshowregisteraddress(true)
        setshowpurchasesHistoric(false)
    }

    
    const handleLogout = () => {
        console.log('userinfo: ', userInfo)
        setToken(null);
        setDecodedToken(null);
        localStorage.removeItem('payload');
        window.location.href = '/';
    }

    const handleaddress=()=>{
        setshowMyshoppins(false)
        setshowaddress(true);
        setshowUserinf(false);
        setshowregisteraddress(false)
        setshowpurchasesHistoric(false)
    }


    const closeModal = () => {
        setshowregisteraddress(false)
        setshowaddress(false)
        setshowUserinf(true)
        setShowUserInfoModal(false);
    };

    return(
        <div>
            <div className="modal-usuario">
                <Usermodal
                    handleLogout={handleLogout}
                    handleaddress={handleaddress}
                    handlemyshoppings={handlemyshoppings}
                    handlemyprofile={handlemyprofile}
                    handlepurchasesHistoric={handlepurchasesHistoric}
                />
                <div className="modal-conteudo">
                    <a onClick={closeModal}> 
                        <BsArrowLeftCircle className="seta-voltar" />
                    </a>
                        {showUserinf &&(<Userprofile />)}
                        {showpurchasesHistoric &&(<PurchasesHistoric />)}
                        {showMyshoppins &&(<Myshopping />)}
                        {Showaddress &&(<Useraddress handleregisterAddress={handleregisterAddress} />)}    
                        {ShowregisterAddress&&(<Addressregister/> )
                        }
                </div>
            </div>
            
        </div>
        )
}
export default Userpage;