import React, { useState, useRef } from 'react';
import QrScanner from 'qr-scanner';

const VerifyProduct = ({ account, central }) => {
    const [productId, setProductId] = useState('');
    const [productStatus, setProductStatus] = useState(null);
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const [companyContractAddress,setCompanyContractAddress]=useState('');

    const handleInput2Change = (e) => {
        setProductId(e.target.value);
    };

    const showErrorMessage = (error) => {
        alert(`An error occurred while connecting to MetaMask: ${error.message}`);
    }

    const checkProduct = async () => {
        try {
            const result = await central.checkProduct(companyContractAddress, parseInt(productId));
            setProductStatus(result);
        } catch (error) {
            setProductStatus('Counterfeit');
            if(!account){
                showErrorMessage(error);
            }
            if((!productId || !fileRef)){
            alert("fill all fields");
            }
        }
    }

    const fileRef = useRef();

    const handleClick = () => {
        fileRef.current.click();
    };

    const handleChange = async (e) => {
        const file = e.target.files[0];
        setFile(file);
        const result = await QrScanner.scanImage(file);
        setData(result);
        setCompanyContractAddress(result);
    };

    return (
        <div className='VerifyProduct'>
            <br></br>
            <br></br>
            <h3 className='Component__title'>Verify Product</h3>
            <div className='Component__form'>
                <div className='form__content'>
                    <label className='form__label'>Enter Product id</label>
                    <input type="text"  className='form__input' value={productId} onChange={handleInput2Change} />
                </div>
                <div className='form__content'>
                    <h2 className='text-center mb-4'>Scan Your QR Code</h2>
                    <div className='card border-0'>
                        <div className="card-body">
                            <button type='button' onClick={handleClick} className='btn btn-success'>
                                Scan QRCode
                            </button>
                            <input type="file" ref={fileRef} onChange={handleChange} accept=".png, .jpg, .jpeg" className='d-none' />
                            <div className='mt-4'>
                                {file && <img src={URL.createObjectURL(file)} alt="QR Code" />}
                            </div>
                        </div>
                    </div>
                </div>
                <button className='button__toggle form__button' onClick={checkProduct}>Verify</button>
                {productStatus && <p>Result: {productStatus}</p>}
            </div>
        </div>
    );
}

export default VerifyProduct;
