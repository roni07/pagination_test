import React from "react";
import {useLocation} from "react-router-dom";
import {InitPost} from "./Home";

const Details: React.FC = () => {

    const {state} = useLocation();

    const post = state as InitPost;

    return (
        <div data-testid="details">
            <pre>
                {
                    JSON.stringify(post, null, 2)
                }
            </pre>
        </div>
    )
}

export default Details;