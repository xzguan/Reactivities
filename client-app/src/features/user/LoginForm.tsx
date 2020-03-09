import React, { useContext } from 'react'
import { Form as FinalFrom, Field } from "react-final-form";
import { Form, Button, Message, Label, Header } from 'semantic-ui-react';
import { TextInput } from '../../app/common/form/TextInput';
import {RootStoreContext} from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';
const LoginForm = () => {
    const rootStore = useContext(RootStoreContext)
    const {login}=rootStore.userStore;
    const validate=combineValidators({
        email: isRequired("[Email]"),
        password: isRequired("[Password]")
    })

    return (
        <FinalFrom 
            onSubmit={(values:IUserFormValues)=>login(values).catch( error => ({
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
                <Form onSubmit={handleSubmit} error>
                    <Header 
                        as="h2"
                        content="Login to Reactivities"
                        color="teal"
                        textAlign="center"
                    />
                    <Field name="email" component={TextInput} placeholder="Email" />
                    <Field 
                        name="password" 
                        component={TextInput}
                        placeholder="password" 
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
                        content="Login" positive loading={submitting} fluid
                        disabled={(invalid && !dirtySinceLastSubmit)  || pristine }
                        
                    />
                    {/* <pre>{JSON.stringify(form.getState(),null,2)}</pre> */}
                </Form>

            )}
        >

        </FinalFrom>
    )
}
export default LoginForm
