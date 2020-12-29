// Requirements
import React from "react";
import { withRouter } from "react-router-dom";
import offWhiteShoes from "../images/offwhite.jpeg";
// css
import "../css/pages/home.css";

// Expoted function
const Home = () => (
    <div className='container d-flex justify-content-center home_container'>
        <div className='col-12 justify-content-center'>
            <div class='row center'>
                <section class='cardone home_card'>
                    <img class="logo" src="https://static.dealwiki.net/media/catalog/product/cache/1/image/400x/9df78eab33525d08d6e5fb8d27136e95/1/0/1000px-logo_nike.svg.png" />
                </section>
                <section class='cardtwo home_card'>
                    <img class="logo" src="https://static.dealwiki.net/media/catalog/product/cache/1/image/400x/9df78eab33525d08d6e5fb8d27136e95/1/0/1000px-logo_nike.svg.png" />
                </section>
            </div>
        </div>
    </div>
);

// Export
export default withRouter(Home);
