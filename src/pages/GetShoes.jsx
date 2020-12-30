// Requirements
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { items } from '../items';
import '../css/pages/getShoes.css';

// Exported fucntions
const GetShoes = () => {
    // State
    const [shoes, setShoes] = useState([]);
    const [mappedShoes, setMappedShoes] = useState([]);
    
    // Internal functions
    const onSuccess = (res) => {
        console.log(res.shoes);
        setShoes(res.shoes);
    }

    const onError = (error) => {
        const { err } = error;
        console.error(err);
        alert("something went wrong");
    }


    const scrapeShoes = () => {
        fetch("http://localhost:3001/api/getshoes")
        .then(res => res.json())
        .then(res => onSuccess(res))
        .catch(err => onError(err));
    }

    // Effects
    useEffect(() => {
        setShoes(items);
    }, []);

    useEffect(() => {
        let mapShoes = [];
        if (shoes && shoes[0]) {
            mapShoes = shoes.map((shoe, index) => {
                return (
                    <>
                        <CopyToClipboard text={shoe.itemUrl} onCopy={() => alert("copied to clipboard")}>
                            <div key={`${shoe.itemSubName}_${index}`} className="card col-12 col-md-5 col-lg-3 shoeName_card p-0">
                                <img src={shoe.itemImage} alt={shoe.itemSubName}/>
                                <div className="align-items-center p-4">
                                    <h4 className="text-dark">{shoe.itemName}</h4>
                                    <p className="darktext">{shoe.itemSubName}</p>
                                    <p className="darktext">{shoe.price}</p>
                                    {shoe.date && <p className="darktext">{shoe.date}</p>}
                                </div>
                            </div>
                        </CopyToClipboard>
                    </>
                );
            })};

        setMappedShoes(mapShoes);

    }, [shoes]);

    return (
        <div className='container d-flex justify-content-center home_container'>
            <div className='col-12 justify-content-center'>
                <div className='d-flex text-center p-5'>
                    <h1 className='text-white home_main_text'>
                        Shoe Inventory
                        <span>😈</span>
                    </h1>
                </div>
                <div className='d-flex justify-content-center p-5'>
                    <button className="cool_button" onClick={() => scrapeShoes()}>
                        Available Shoes
                    </button>
                </div>
                <div className="container">
                    <div className="row shoeName_container">
                        {mappedShoes && mappedShoes[0] ? mappedShoes : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Exports
export default withRouter(GetShoes);
