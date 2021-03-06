import { observable, action, computed, runInAction } from "mobx";
import { createContext, SyntheticEvent, } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";
import { RootStore } from "./rootStore";

export default class ActivityStore {

    constructor(private rootStore:RootStore){}

    @observable title = "Hello world";
    @observable activityRegistry = new Map();
    @observable activity: IActivity | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = "";


    @action loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const activities = await agent.Activities.list();

            runInAction("loading activities", () => {
                activities.forEach((activity) => {
                    activity.date = new Date(activity.date)
                    this.activityRegistry.set(activity.id, activity);
                });
                //console.log("---------------",Array.from(this.activityRegistry.values())[0].id)
                this.loadingInitial = false;
            })

        }
        catch (error) {
            runInAction("load activities error", () => {
                this.loadingInitial = false;
            })
        }
        
    }

    @action loadActivity = async (id: string)=>{
        let activity = this.getActivity(id);
        if (activity) {
            this.activity = activity;
            return activity;
        }
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id)
                runInAction("loading activity", () => {
                    activity.date=new Date(activity.date);
                    this.activity=activity;
                    this.activityRegistry.set(activity.id,activity);
                    this.loadingInitial = false;
                })
                return activity;
            }
            catch{
                runInAction("loading activity error",()=>{
                    this.loadingInitial=false;
                })
            }
        }


    }
    getActivity(id: string) {
        return this.activityRegistry.get(id);
    }
    @computed get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from( this.activityRegistry.values()))
    }
   
    groupActivitiesByDate(activities: IActivity[]) {
        const sortedActivities = activities.sort((a, b) => {
            return a.date.getTime() - b.date.getTime();
        })
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date.toISOString().split("T")[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as { [key: string]: IActivity[] }))
    }

    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            activity= await agent.Activities.create(activity);
            runInAction("creating activity", ()=>{
                this.activityRegistry.set(activity.id, activity)
            })
            this.submitting = false;
        }
        catch (error) {
            runInAction("creating activity",()=>{
                this.submitting=false;
            })
        }
       
    }
    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction("edit activity", () => {
                this.activityRegistry.set(activity.id, activity);
                this.activity=activity;
                this.submitting=false;
            })

        }
        catch (error) {
            runInAction("edit activity error",()=>{
                this.submitting=false;
            })
        }
        finally {
            this.submitting = false;
        }
    }
    @action clearActivity = () => {
        this.activity = null;
    }




    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;

        try {
            await agent.Activities.delete(id);
            runInAction("deleting activity",()=>{
                this.activityRegistry.delete(id);
                this.submitting=false;
                this.target="";
            })
          
        }
        catch (error) {
            runInAction("delete activity error",()=>{
                this.submitting=false;
                this.target=""
            })
        } 

    }
}