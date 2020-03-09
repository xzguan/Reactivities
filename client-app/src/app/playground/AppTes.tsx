import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Form as FinalForm, Field , FieldRenderProps } from "react-final-form";
import { Container, Grid, Header, Segment,  Button, Message, Modal,Image, CardMeta, Form, Input, FormFieldProps, Label, TextArea } from "semantic-ui-react";
import { ValidationErrors } from 'final-form';
import { SelectInput } from "../common/form/SelectInput";
import { categories as category} from '../common/options/categoryOptions';
//import { DateInput } from '../common/form/DateInput';
import { observer } from 'mobx-react-lite';
import { DateTimePicker} from 'react-widgets';
import { min, isDate } from 'date-fns';


interface IProps extends FieldRenderProps<any, HTMLElement>,
FormFieldProps {} 

const DateInput:React.FC<IProps>=({
    input,
    name,
    initialvalue,
    ...rest
})=>{
   
    
    return (
        <DateTimePicker name={name}  value={input.value || undefined}  onChange={input.onChange} />
    )
}
interface IProps1{
    initialValue:Date
}
class ChangeExample extends React.Component {
   
    state={value:new Date() || undefined}
    render() {
        
      return (
        <div>
            <DateTimePicker
              value={this.state.value}
              currentDate={this.state.value}
              onChange={(date,datestr)=>this.setState({value:datestr})}
              onCurrentDateChange={value => this.setState({ value })}
              //onKeyDown={value => this.setState({ value })}
            />
            {isDate(this.state.value)? this.state.value.toISOString() : "undefined"}
        </div>
      )
    }
  }
  
const InputText:React.FC<IProps>=({
    input,
    width,
    meta:{error,touched}
})=>{
    return (
        <Form.Field width={width}>
            <Label >username</Label>
            <Input {...input} placeholder="User Name"  />
            {error && touched && <Label>{error}</Label>}
        </Form.Field>
    )
}


const AppTest = () => {
    const onSubmit=(values:any)=>{
        console.log("submit ...")
       
    }
    const handleFinalFormSubmit=(values:any)=>{
        console.log(values)
        window.alert(JSON.stringify(values))
    }
    const validate=(values:any):any=>{
        const errors:ValidationErrors={}
        console.log("the validate is running",values.username)
        if(!values.username) {
            errors.username="required"
           
        }
        
        return errors;
    }
    return (
        <Container>
           
            {/* <FinalForm
                onSubmit={handleFinalFormSubmit}
           
                render={({handleSubmit,form})=>(
                    <Form onSubmit={handleSubmit}>
                        <Field name="username" type="text" width={6} component={InputText} />
                        <Field name="date"  component={DateInput}   />
                        <Field name="myField" width={5}>
                            {props => (
                                <div>
                                    <TextArea
                                        name={props.input.name}
                                        value={props.input.value}
                                        onChange={props.input.onChange}
                                        width={props.input.width}
                                    />
                                </div>
                            )}
                        </Field>
                        <Button type="submit">Submit</Button>
                        <Button type="button" onClick={form.reset}>Reset</Button>
                    </Form>
                )}
            >
            </FinalForm> */}
                
            
        </Container>
    )
}
function Extend<First extends object,Second extends object>(first:First,  second:Second ):First & Second{
    const result: Partial<First&Second>={};
    for(const prop in first){
        if(first.hasOwnProperty(prop)){
            (result as First)[prop]=first[prop]
        }
    }
    for(const prop in second){
        if(second.hasOwnProperty(prop)){
            (result as Second)[prop]=second[prop];
        }
    }
    return  result as First & Second;

}
interface Loggable {
    log(name:string):void;
}
class ConsoleLogger implements Loggable {
    log(name:string) {
        console.log(`Hello, I'm ${name}.`);
    }
}
export default (AppTest)
