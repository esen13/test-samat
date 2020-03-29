import React from "react";

export const Loader = () => {
    return (
        <div className="mt-5 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
};