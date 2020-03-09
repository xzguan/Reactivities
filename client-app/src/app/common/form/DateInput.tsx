import React from 'react'
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps,Form, Label } from "semantic-ui-react";
import { DateTimePicker } from 'react-widgets';

interface IProps 
    extends FieldRenderProps<any,HTMLElement>, FormFieldProps {}

export const DateInput : React.FC<IProps> = ({
    input,
    width,
    placeholder,
    date=false,
    time=false,
    meta: { touched, error },
    id,
    ...rest
}) => {
    return (
        <Form.Field error={touched && !!error}  width={width} >
            <DateTimePicker  
                placeholder={placeholder} 
                value={input.value || null}
                date={date} 
                time={time} 
                onChange={input.onChange}
                defaultValue={new Date()}
                onKeyDown={()=>{
                    
                }} 
                
               {...rest}                 
            />
            {touched && error && (
                <Label basic color="red" >
                    {error}
                </Label>
            )}
        </Form.Field>
        
    )
}