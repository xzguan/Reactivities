export interface IActivity {
    id:string,
    description :string,
    title:string,
    category:string,
    date:Date ,
    city:string,
    venue:string
}

export interface IActivityFormValues extends Partial<IActivity>{
    time?:Date;
}

export class ActivityFormValues implements IActivityFormValues {
    id?:string=undefined;
    description :string="";
    title:string="";
    category:string="";
    date?:Date=undefined ;
    time?:Date=undefined;
    city:string="";
    venue:string=""
    constructor(init?:IActivityFormValues){
        Object.assign(this,init);
    }
}