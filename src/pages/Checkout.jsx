// Requirements
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Loader from "../components/Loader";
import "../css/pages/checkout.css";

// Constants
const sizes = [null, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15];

// Exported functions
const Checkout = () => {
    // State
    const [loading, setLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        nikeEmail: "",
        nikePassWord: "",
        nikeShoeUrl: "",
        securityCode: "",
        shoeSize: null,
        failSafe: true,
    })

    // Internal Functions
    const onChange = (e) => {
        e.preventDefault();
        const { name, value} = e.target;

        setFormFields({ ...formFields, [name]: value });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formFields)
    }

    //Effects
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Loader loading={loading}>
            <div className='container d-flex justify-content-center home_container'>
                <div className='col-12 justify-content-center'>
                    <div className='d-flex text-center p-5'>
                        <h1 className='text-white home_main_text'>
                            Checkout
                            <span>💰</span>
                        </h1>
                    </div>
                    <div className="d-flex justify-content-center">
                        <form className="text-white checkout_form" onSubmit={submitHandler}>
                            <section key="nike_email" className="d-flex flex-column m-4 w-80">
                                <label htmlFor="nike_email">Nike Email:</label>
                                <input
                                    id="nike_email"
                                    type="text"
                                    placeholder="Enter your nike account email"
                                    name="nikeEmail"
                                    onChange={onChange}
                                />
                            </section>
                            <section key="nike_password" className="d-flex flex-column m-4 w-80">
                                <label htmlFor="nike_password">Nike Password:</label>
                                <input
                                    id="nike_password"
                                    type="password"
                                    placeholder="Enter your nike account password"
                                    name="nikePassWord"
                                    onChange={onChange}
                                    autoComplete="off"
                                />
                            </section>
                            <section key="nike_url" className="d-flex flex-column m-4 w-80">
                                <label htmlFor="nike_url">Nike Shoe Url:</label>
                                <input
                                    id="nike_url"
                                    type="text"
                                    placeholder="Enter your nike shoe url"
                                    name="nikeShoeUrl"
                                    onChange={onChange}
                                    autoComplete="off"
                                />
                            </section>
                            <section key="cc_security" className="d-flex flex-column m-4 w-80">
                                <label htmlFor="cc_security">Card Security Code:</label>
                                <input
                                    id="cc_security"
                                    type="text"
                                    placeholder="XXX"
                                    name="securityCode"
                                    onChange={onChange}
                                    autoComplete="off"
                                    maxLength="3"
                                />
                            </section>
                            <section key="shoe_size" className="d-flex flex-column m-4 w-80">
                                <label htmlFor="shoe_size">Shoe Size:</label>
                                <select
                                    id="shoe_size"
                                    type="select"
                                    name="shoeSize"
                                    onChange={onChange}
                                >
                                    {sizes.map(size => (
                                        <option key={`key_${size}`} value={size}>{size}</option>
                                    ))}
                                </select>
                            </section>
                            <section key="fail_safe" className="d-flex flex-column m-4 w-80">
                                <label htmlFor="fail_safe">Fail Safe:</label>
                                <select
                                    id="fail_safe"
                                    type="select"
                                    name="failSafe"
                                    onChange={onChange}
                                >
                                    <option key={`key_${true}`} value={true}>On</option>
                                    <option key={`key_${false}`} value={false}>Off</option>
                                </select>
                            </section>
                            <div className="d-flex justify-content-center">
                                <button className="checkout_form_submit" type="submit">Purchase</button>
                            </div>                            
                        </form>
                    </div>
                </div>
            </div>
        </Loader>
    );
};

// Exports
export default withRouter(Checkout);
