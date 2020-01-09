import {observable,action, computed, runInAction  } from "mobx";
import { createContext, SyntheticEvent, } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";
class ActivityStore {
    @observable title:string="Hello world";
    @observable activities: IActivity[]=[];
    @observable activity:IActivity | null=null;
    @observable activityRegistry=new Map();
    @observable loadingInitial=false;
 
    @observable editMode=false;
    @observable submitting=false;
    @observable target="";

    @action loadActivities =async ()=>{
        this.loadingInitial=true;
        try{
            const activities= await agent.Activities.list();
            
            runInAction("loading activities",()=>{
                activities && activities.forEach((activity)=>{
                    activity.date=activity.date.split('.')[0];
                    this.activityRegistry.set(activity.id,activity);
                })
            })
            console.log(this.groupActivitiesByDate(activities));

        } 
        catch(error) {
            console.log(error,"error");
        }
        finally{
            this.loadingInitial=false;
        }
    }
    @computed get activitiesByDate(){
        return  Array.from(this.activityRegistry.values());
    }
    @computed get activitiesGroupByDate(){
        return  this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
    }

    groupActivitiesByDate(activities:IActivity[]){
        //if(!activities) return {} as {[key:string] : IActivity[]};
        try{

            const sortedActivities=activities.sort((a,b)=>{
                return Date.parse(a.date)-Date.parse(b.date);
             })
            
             return Object.entries(sortedActivities.reduce(
                 (activities,activity)=>{
                    const date=activity.date.split("T")[0];
                    activities[date]=activities[date]?[...activities[date],activity]:[activity];
                    return activities;
                },
             {} as {[key:string] : IActivity[]}))
        }
        catch(ex){
            console.log(ex);
        }
        
    }

    @action createActivity=async (activity:IActivity)=>{
        this.submitting=true;
        try{
            await agent.Activities.create(activity);
            this.activityRegistry.set(activity.id, activity)
            this.editMode=false;
            this.submitting=false;
        }
        catch(error){
            console.log(error)
        }
        finally{
            this.submitting=false;
        }
    }
    @action editActivity=async(activity:IActivity) => {
        this.submitting=true;
        try{
            await agent.Activities.update(activity);
            runInAction("edit activity",()=>{
                this.activityRegistry.set(activity.id,activity);
                // this.selectedActivity=activity;
                // this.editMode=false;
                this.clearActivity();
            })
           
        }
        catch(error){
            console.log(error);
        }
        finally{
            this.submitting=false;
        }
    }
    @action clearActivity=()=>{
        this.activity=null;
    }
    @action loadActivity=async (id:string)=>{
        let activity=this.getActivity(id);
        if(activity){
            this.activity=activity;
        }else{
            this.loadingInitial=true;
            try{
                activity=await agent.Activities.details(id);
                runInAction("loading activity",()=>{
                    this.activity=activity;
                    this.loadingInitial=false;
                })
            }
            catch(error){
                runInAction("loading activity error",()=>{
                    console.log(error);
                    this.loadingInitial=false;
                })
            }
           
        }

    }
    
    getActivity(id:string){
        return this.activityRegistry.get(id);
    }

    @action deleteActivity=async(event:SyntheticEvent<HTMLButtonElement>,id:string)=>{
        this.submitting=true;
        this.target=event.currentTarget.name;

        try{
            await agent.Activities.delete(id);
            this.activityRegistry.delete(id);    
        }
        catch(error){
            console.log(error);
        }
        finally{
            this.target="";
            this.submitting=false;
            if(this.activity && this.activity.id===id){
                this.activity=null;
            }
        }

    }
  

  
}

export default createContext(new ActivityStore());