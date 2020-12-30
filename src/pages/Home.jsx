// Requirements
import React from "react";
import { withRouter } from "react-router-dom";
// css
import "../css/pages/home.css";

// Expoted function
const Home = ({ history }) => (
    <div className='container d-flex justify-content-center home_container'>
        <div className='col-12 justify-content-center'>
            <div className='d-flex text-center p-5'>
                <h1 className='text-white home_main_text'>
                    Welcome
                    <span>😈</span>
                </h1>
            </div>
            <div class='row center'>
                <button class='cardone home_card' onClick={() => history.push("/get-shoes")}>
                    <h4 className='text-dark'>Get Shoe Options</h4>
                    <img
                        class='logo'
                        src='https://static.dealwiki.net/media/catalog/product/cache/1/image/400x/9df78eab33525d08d6e5fb8d27136e95/1/0/1000px-logo_nike.svg.png'
                        alt='nike logo'
                    />
                </button>
                <button class='cardtwo home_card' onClick={() => history.push("/checkout")}>
                    <h4 className='text-white'>Purchase Shoes</h4>
                    <img
                        class='logo'
                        src='https://static.dealwiki.net/media/catalog/product/cache/1/image/400x/9df78eab33525d08d6e5fb8d27136e95/1/0/1000px-logo_nike.svg.png'
                        alt='nike logo'
                    />
                </button>
            </div>
        </div>
    </div>
);

// Export
export default withRouter(Home);
