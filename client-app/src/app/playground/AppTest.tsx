import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Form as FinalForm, Field, FieldRenderProps } from "react-final-form";
import { Container, Grid, Header, Segment,  Button, Message, Modal,Image, CardMeta, Form, Input, FormFieldProps } from "semantic-ui-react";
import { ValidationErrors } from 'final-form';
import { SelectInput } from "../common/form/SelectInput";
import { category } from '../common/options/categoryOptions';
import { DateInput } from '../common/form/DateInput';


interface IProps extends FieldRenderProps<string, HTMLSelectElement>,
FormFieldProps {} 


export const AppTest  = () => {
    const onSubmit=(values:any)=>{
        window.alert(JSON.stringify(values))
    }
    const validate=(values:any):any=>{
        const errors:ValidationErrors={}
        console.log("the validate is running",values.username)
        if(!values.username) {
            errors.username="required"
            console.log("validate works")
        }
        if(!values.date) {
            errors.date="require"
        }
        return errors;
    }
    return (
        <Container>
            <FinalForm onSubmit={onSubmit} validate={validate} render={({handleSubmit,invalid,pristine})=>(
                <Form onSubmit={handleSubmit}>
                    <Field name="username" >
                        {({input,meta})=>(
                            <>
                            <input {...input} placeholder="User Name"  />
                        {meta.error && meta.touched &&<span>{meta.error}</span>}
                            </>
                        )}                        
                    </Field>
                    <Field
                        component={SelectInput} 
                        name="category" 
                        options={category}
                        placeholder="Category"
                    
                    />     
                    <Field 
                        name="date"
                        component={DateInput}
                        placeholder="Date"
                    />              
                    <button type="submit">Submit</button>
                </Form>
            )}
            >
            </FinalForm>
        </Container>
    )
}
