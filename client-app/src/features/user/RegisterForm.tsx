import React, { useContext } from 'react'
import { Form as FinalFrom, Field } from "react-final-form";
import { Form, Button, Message, Label, Header } from 'semantic-ui-react';
import { TextInput } from '../../app/common/form/TextInput';
import {RootStoreContext} from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
//import { combineValidators, isRequired,  } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';
import { isValidEmail,composeValidators ,isRequired, isValidPassword} from "../../app/validators/customValidators";
const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext)
    const {register}=rootStore.userStore;
    const validate=(values:IUserFormValues) => {
        
        return {
        username:isRequired(["username"])(values),
        password:isValidPassword(["password"])(values),
        confirm:((values:IUserFormValues)=>values.password===values.confirm?undefined:"Must match")(values),
        ...composeValidators<IUserFormValues>([isRequired,isValidEmail])(["email"])(values)    
    }}

    return (
        <FinalFrom 
            onSubmit={(values:IUserFormValues)=>register(values).catch( error => ({
                [FORM_ERROR]:error
            }))}
            validate={validate}
            render={({
                handleSubmit,
                form,
                submitError,
                submitting,
                dirtySinceLastSubmit,
                invalid,
                pristine
            })=>(
                <Form onSubmit={handleSubmit} error >
                    <Header 
                        as="h2"
                        content="Login to Reactivities"
                        color="teal"
                        textAlign="center"
                    />
                    <Field name="username" component={TextInput} placeholder="sername" />
                    <Field name="displayName" component={TextInput} placeholder="Display Name" />
                    <Field name="email" component={TextInput} placeholder="Email" />
                    <Field 
                        name="password" 
                        component={TextInput}
                        placeholder="password" 
                        type="password" 
                    />
                    <Field 
                        name="confirm" 
                        component={TextInput}
                        placeholder="confirm" 
                        type="password" 
                    />
                     
                    {submitError && !dirtySinceLastSubmit && (
                         <ErrorMessage 
                            errors={submitError}
                            text="Invalid email or password"
                        />
                                           
                    )}
                    <br />
                    <Button 
                        content="Register" positive loading={submitting}
                        disabled={(invalid && !dirtySinceLastSubmit)  || pristine }
                        
                    />
                    {/* <pre>{JSON.stringify(form.getState(),null,2)}</pre> */}
                </Form>

            )}
        >

        </FinalFrom>
    )
}
export default RegisterForm
