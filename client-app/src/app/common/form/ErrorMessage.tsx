import React from 'react'
import { AxiosResponse } from "axios";
import { Message } from "semantic-ui-react";
interface IProp {
    errors: AxiosResponse;
    text?: string;
}

const ErrorMessage : React.FC<IProp> = ({errors,text}) => {
    //console.log(JSON.stringify(error));s
    return (
        <Message error >
            <Message.Header>{errors.statusText}</Message.Header>
            {errors.data && Object.keys(errors.data).length > 0 && (
                <Message.List>
                    {Object.values(errors.data.errors).flat().map((err,i)=>(
                        <Message.Item key={i}>{err}</Message.Item>
                    ))}
                </Message.List>
            )}
            
       
        </Message>
        
    )
}

export default ErrorMessage