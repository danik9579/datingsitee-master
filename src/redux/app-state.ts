import IPerson from "../models/IPerson";
import ISuccesfullLoginData from "../models/ISuccesfullLoginData";

export class AppState {
    public userDetails: ISuccesfullLoginData = {id:0 , age:0 , gender:"" , nickName:""};
    public usersList: IPerson[] = [];
}