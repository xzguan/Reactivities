import { RootStore } from "./rootStore";
import { observable,computed,action,runInAction } from "mobx";
import { IUser,IUserFormValues } from "../models/user";
import agent from "../api/agent";
import {history} from "../.."

export default class UserStore {
   
    constructor(private rootStore:RootStore){}

    @observable user: IUser | null=null;
    @computed get isLoggedIn() {
        return !!this.user;
    }

    @action login=async (values:IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            runInAction("user login", () => {
                this.user = user;
            })
            //console.log(user)
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push("/activities");
        } catch (error) {
            throw error
        }
    }
    @action register=async (values:IUserFormValues) => {
        try {
            const user = await agent.User.register(values);
            runInAction("user register", () => {
                this.user = user;
            })
            console.log(user)
            history.push("/activities");
        } catch (error) {
            throw error
        }
    }
    @action logout= ()=>{
        this.rootStore.commonStore.setToken(null);
        this.user=null;
        history.push("/");
    }
    
}