import React, { useContext,  useEffect} from 'react'

import {  Grid } from "semantic-ui-react";
import  {RootStoreContext, RootStore}  from "../../../app/stores/rootStore";
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import  ActivityDetailedHeader  from "./ActivityDetailedHeader";
import  ActivityDetailedChat  from "./ActivityDetailedChat";
import  ActivityDetailedInfo  from "./ActivityDetailedInfo";
import { ActivityDetailedSidebar } from "./ActivityDetailedSidebar";

 

interface IProps {
    id:string
}

const ActivityDetails : React.FC<RouteComponentProps<IProps>> = 
        ({match,history}) => 
    {
        const id=match.params.id;
        const rootStore=useContext(RootStoreContext);
        const {loadActivity,activity,loadingInitial}=rootStore.activityStore;
       
        useEffect(() => {
           loadActivity(id);
           
        }, [loadActivity,id])
        if(loadingInitial || !activity ) return <LoadingComponent inverted={false} content="Loading activity..." />
        // if(!activity) 
        //     return history.push("/notfound");
        // if(!activity)
        //     return <h2>Activity not found</h2>
        
        return (
            <Grid>
                <Grid.Column width={10}>
                    <ActivityDetailedHeader activity={activity} />
                    <ActivityDetailedInfo activity={activity} />
                    <ActivityDetailedChat />
                </Grid.Column>
                <Grid.Column width={6}>
                    <ActivityDetailedSidebar />
                </Grid.Column>
            </Grid>
    )
}
export default observer(ActivityDetails);
