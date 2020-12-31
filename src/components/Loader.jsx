// Requirements
import React from "react";
import { withRouter } from "react-router-dom";
import "../css/components/loader.css";

// Exported functions
const Loader = ({
    loading = false,
    errorMessage = "",
    children,
}) => {
    if (loading || errorMessage) {
        return (
            <>
                <div
                    className='stage d-flex justify-content-center align-items-center'
                    style={{ width: "100vw", height: "100vh" }}
                >
                    <img
                        className='box bounce-2 loader_image'
                        src='https://s3-us-west-1.amazonaws.com/www.jguffey.com/extra/nike19.png'
                        alt='nike shoeloader'
                    />
                    <h1 className="text-white">Loading...</h1>
                </div>
            </>
        );
    }
    return children;
};
// Export
export default withRouter(Loader);
