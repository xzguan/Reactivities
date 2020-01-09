import React, {  useContext, Fragment } from 'react'

import {  Item, Label } from 'semantic-ui-react'
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from 'mobx-react-lite';

import { ActivityListItem } from './ActivityListItem';

const ActivityList : React.FC = () => {
    const activityStore=useContext(ActivityStore)
    const {activitiesGroupByDate}=activityStore
    console.log(activitiesGroupByDate)
    if(!activitiesGroupByDate || activitiesGroupByDate.length===0)return (<p>No Data</p>)
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