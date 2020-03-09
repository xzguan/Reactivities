import React from 'react';
import { render } from "react-dom";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps,Form, Label, Select } from "semantic-ui-react";
import { category } from '../options/categoryOptions';

interface IProps 
    extends FieldRenderProps<string,HTMLElement> , FormFieldProps{}


export const SelectInput:React.FC<IProps> = ({
    input,
    width,
    placeholder,
    meta: { touched, error }
}) => {
    
    return (
        <Form.Field error={touched && !!error} width={width} >
            <Select
                value={input.value}
                onChange={(e,data)=>input.onChange(data.value)}
                placeholder={placeholder} 
                options={category}
            ></Select>
            {touched && error && (
                <Label basic color="red" >
                    {error}
                </Label>
            )}
        </Form.Field>
    )
}
