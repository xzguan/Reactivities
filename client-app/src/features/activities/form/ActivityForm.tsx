import React, { useState ,useEffect, useContext} from 'react'
import {  ActivityFormValues } from '../../../app/models/activity';

import { Segment, Form, Button,FormField, Grid } from "semantic-ui-react";
import {RootStoreContext} from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from 'react-router-dom';

import { Form as FinalForm, Field } from "react-final-form";
import { TextInput } from "../../../app/common/form/TextInput";
import { TextArea } from "../../../app/common/form/TextArea";
import { DateInput } from '../../../app/common/form/DateInput';
import { SelectInput } from '../../../app/common/form/SelectInput';

import { combineDateAndTime } from "../../../app/common/util/util";
import { categories } from '../../../app/common/options/categoryOptions'
import uuid from 'uuid';
import { 
    combineValidators,
    isRequired,
    composeValidators,
    hasLengthGreaterThan 
} from "revalidate";


interface IDetailParams {
    id:string
}

const ActivityForm : React.FC<RouteComponentProps<IDetailParams>> = ({
    match,history
}) => {
    const rootStore=useContext(RootStoreContext);
    const {loadActivity,submitting,createActivity,editActivity }=rootStore.activityStore;
    const [activity,setActivity] = useState(new ActivityFormValues())
    const [loading,setLoading]=useState(false);

    const validate=combineValidators({
        date:isRequired(
            "Date"
        ),
        time:isRequired("Time")
    })
    useEffect(() => {
        if(match.params.id){
            setLoading(true);
            loadActivity(match.params.id).then((activity)=>{
                setActivity(activity)
            })
            .finally(()=>setLoading(false))
        }        

    }, [match.params.id,loadActivity])

    
    const handleFinalFormSubmit=(values:any)=>{
        const {date,time,...activity}=values;
        let dateAndTime= combineDateAndTime(date,time);
        activity.date=dateAndTime
        if(!activity.id){
            let newActivity={
                ...activity,
                id:uuid(),
            }
            createActivity(newActivity)
        }else {
            editActivity(activity)
        }
       // alert(JSON.stringify(values))
       // console.log(activity);
       // console.log(values);
    }
    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        onSubmit={handleFinalFormSubmit}
                        initialValues={activity}
                        render={({ handleSubmit, pristine, invalid }) => (

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
                                    options={categories}
                                />
                                <Form.Group widths="equal">
                                    <Field
                                        component={DateInput}
                                        name="date"
                                        date={true}
                                        placeholder="Date"
                                        value={activity.date}
                                    />
                                    <Field
                                        component={DateInput}
                                        name="time"
                                        time={true}
                                        placeholder="time"
                                        value={activity.date}
                                    />
                                </Form.Group>

                                <Field
                                    component={TextInput}
                                    name="city"
                                    placeholder="City"
                                    value={activity.city}
                                />
                                <Field

                                    component={TextInput}
                                    name="venue"
                                    placeholder="Venue"
                                    value={activity.venue}
                                />

                                <Button
                                    loading={submitting} 
                                    floated="right" 
                                    positive
                                    disabled={loading ||invalid ||pristine} 
                                    type="submit"
                                    content="Submit"
                                >
                                </Button>

                                <Button
                                    onClick={
                                        activity.id
                                            ? () => { history.push(`/activities/${activity.id}`) }
                                            : () => { history.push('/activities') }
                                    }
                                    disabled={loading}
                                    floated="right"
                                    type="button"
                                    content="Cancel"
                                />

                            </Form>
                        )}

                    >

                    </FinalForm>

                </Segment>
            </Grid.Column>
        </Grid>
       
        
    )


};

export default observer(ActivityForm); 
