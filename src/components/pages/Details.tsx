import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { InitPost } from "./Home";

const Details: React.FC<RouteComponentProps> = (props: RouteComponentProps<{}, any, InitPost | any>) => {

    const post = props.location.state;

    return (
        <div>
            <pre>
                {
                    JSON.stringify(post, null, 2)
                }
            </pre>
        </div>
    )
}

export default Details;