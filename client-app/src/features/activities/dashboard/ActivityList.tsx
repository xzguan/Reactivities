import React, {  useContext, Fragment } from 'react'

import {  Item, Label } from 'semantic-ui-react'
import {RootStoreContext} from "../../../app/stores/rootStore";
import { observer } from 'mobx-react-lite';

import { ActivityListItem } from './ActivityListItem';

const ActivityList : React.FC = () => {
    const RootStore=useContext(RootStoreContext)
    const {activitiesByDate:activitiesGroupByDate}=RootStore.activityStore
    console.log(activitiesGroupByDate)
    if(!activitiesGroupByDate )return (<p>No Data</p>)
    return (
        <Fragment>
            { activitiesGroupByDate.map(([group,activities])=>(
                <Fragment key={group}>
                    <Label size="large">
                        {group}
                    </Label>
                    <Item.Group divided>
                        {activities && activities.map(activity=>(    
                             <ActivityListItem key={activity.id} activity={activity} />
                        ))}
                    </Item.Group>
                </Fragment>
            ))}
        </Fragment>
    )
}
export default observer(ActivityList)