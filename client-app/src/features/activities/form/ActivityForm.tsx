import React, { useState, FormEvent ,useEffect, useContext} from 'react'
import { IActivity } from '../../../app/models/activity';
import uuid from "uuid";
import { Segment, Form, Button } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from 'react-router-dom';
import { DateTimePicker } from 'react-widgets'
import { Form as FinalForm, Field } from "react-final-form";
import { TextInput } from "../../../app/common/form/TextInput";
import { TextArea } from "../../../app/common/form/TextArea";
import { DateInput } from '../../../app/common/form/DateInput';
import { SelectInput } from '../../../app/common/form/SelectInput';

interface IDetailParams {
    id:string
}

const ActivityForm : React.FC<RouteComponentProps<IDetailParams>> = ({
    match,history
}) => {
    

    const activityStore=useContext(ActivityStore);

    const {activity:initialFormState,loadActivity,clearActivity ,createActivity,editActivity,submitting}=activityStore;

    const [activity,setActivity] = useState<IActivity>({
        id:"",
        title:"",
        category:"",
        description:"",
        date:"",
        city:"",
        venue:""
    })

    useEffect(() => {
        if(match.params.id && activity.id.length===0){
            loadActivity(match.params.id).then(()=>{
                initialFormState && setActivity(initialFormState)
            })
        }
        return ()=>{
            clearActivity();
        }
        

    }, [initialFormState,match.params.id,activity.id.length,clearActivity,loadActivity])

    const handleSubmit=() => {
        if(activity.id.length===0){
            let newActivity={
                ...activity,
                id:uuid()
            }
            createActivity(newActivity).then(()=>{
                history.push(`/activities/${newActivity.id}`)
            });
        }else{
            editActivity(activity).then(()=>{
                history.push(`/activities/${activity.id}`)
            })
        }
    }
    
    const handleInputChange= (event:FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name,value} = event.currentTarget;
        setActivity({...activity,[name]:value})
    }
    const handleFinalFormSubmit=(values:any)=>{
        console.log(values)
    }
    return (
        <>
        <Segment clearing>
            <FinalForm 
                onSubmit={handleFinalFormSubmit}
                render={({handleSubmit})=>(
                    <Form onSubmit={handleSubmit}   >
                        <Field    
                            name="title"
                            placeholder="Title"
                            value={activity.title}
                            component={TextInput}                       
                        />
                        <Field
                            component={TextArea}
                            rows={2}
                            name="description"
                            placeholder="Description"
                            value={activity.description}
                        />
                        <Field
                            component={SelectInput}
                            name="category"
                            placeholder="Category"
                            value={activity.category}
                        />
                        <Field
                            component={DateInput}
                            name="date"
                            
                            placeholder="Date"
                            value={activity.date}
                        />
                        <Form.Input
                            onChange={handleInputChange}
                            name="city"
                            placeholder="City"
                            value={activity.city}
                        />
                        <Form.Input
                            onChange={handleInputChange}
                            name="venue"
                            placeholder="Venue"
                            value={activity.venue}
                        />

                        <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
                        <Button
                            onClick={() => { history.push("/activities") }}
                            floated="right"
                            type="button"
                            content="Cancel"
                        />

                    </Form>
                )}
                      
            >

            </FinalForm>
            <DateTimePicker />
        </Segment>
       
        </>
    )


};

export default observer(ActivityForm); 
