
import { stringify } from "querystring";
import { IFormValues } from "../models/user";

export const isValidEmail=<T extends IFormValues>(keys:[keyof T])=>(values:T)=>{
  if (values[keys[0]] && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[keys[0]]!)) 
    return "Invalid Email Format"
}

export const isValidPassword=<T extends IFormValues>(keys:[keyof T])=>(values:T)=>{
  let value=values[keys[0]]
    if(value && !/^(?=.*[A-Z].*)(?=.*[a-z].*).+$/.test(value!))
      return "at least lower case and uppcase";
    if(value && !/^(?=.*[!@#$%&].*).+$/.test(value!))
      return "must include one of special character !@#$^&*";
    if(value && !/^.{6,}$/.test(value!))
      return "must more than 6 charater";
    
}
   
export const isRequired=<T extends IFormValues>(keys:[keyof T]) => (values:T) => {
  if(!values[keys[0]]){
    return "Required"
  }
}

type validator=<T extends IFormValues>(keys:[keyof T])=>(values:T)=>string | undefined
export const composeValidators=<T extends IFormValues>(validators:validator[])=>(keys:[keyof T])=>(values:T)=>{
   
   let result=validators.reduce((errors:string|undefined,validator)=> 
      errors || validator<T>(keys)(values),undefined)
   return {[keys[0]]:result}
}
