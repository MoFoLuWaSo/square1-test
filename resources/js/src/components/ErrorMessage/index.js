import React from 'react';

import {Alert} from "antd";

const ErrorMessage = (props) => {
    const {error} = props

    // const message = useSelector(({common}) => common.message);

    //const displayMessage = message;


    const getErrors = () => {
        let errors = [];
        for (let i in error) {
            for (let j in error[i]) {
                errors.push(error[i][j]);
            }
        }
        return errors;
    }

    return (
        <>
            {error && typeof error !== "string" && (

                <Alert
                    message="Error"
                    description={<> {getErrors().map((value, index) => {
                        return (
                            <p key={index} className="text-red-600 pb-2">{value}</p>
                        );

                    })
                    }</>}
                    type="error"
                    showIcon
                    closable
                />
            )}
            {error && typeof error === "string" && (

                <Alert
                    message="Error"
                    description={<p className="text-red-600 pb-2">{error}</p>}
                    type="error"
                    showIcon
                    closable
                />
            )}
        </>
    );
};

export default ErrorMessage;
