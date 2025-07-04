import conf from "../Conf/conf";
import {Client,Account,ID}from "appwrite"; 

export class Authservice{
    client=new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteProjectid);
        this.account=new Account(this.client);


    }

    async CreateAccount({email,password,name}){
        try {
            
          const userAccount=  await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                return this.login({email,password})
            }else{
                return userAccount;
            }
            
        } catch (error) {
            throw error;
            
        }

    }

    async login({email,password}){
        try {
           return await this.account.createEmailPasswordSession(email,password);
            
        } catch (error) {
            throw error;
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
            
        } catch (error) {
            throw error;
            
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions('All');
            
        } catch (error) {
            throw error;
            
        }
    }
}

const authservice=new Authservice();


export default authservice