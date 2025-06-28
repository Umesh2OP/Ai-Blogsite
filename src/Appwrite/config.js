import conf from "../Conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client;
  databases;
  bucket;

  constructor() {
    this.client = new Client();

    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteProjectid);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, Content, status, featuredImage, Userid }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabseId,
        conf.appwritcollectionId,
         ID.unique(), 
        
        {
          title,
          Content,
          featuredImage,
          status,
          Userid,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(slug, { title, Content, status, featuredImage }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabseId,
        conf.appwritcollectionId,
        slug,
        {
          title,
          Content,
          status,
          featuredImage,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabseId,
        conf.appwritcollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabseId,
        conf.appwritcollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabseId,
        conf.appwritcollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBuckedID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBuckedID, fileId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getFilePreview(fileId) {
  return this.bucket.getFileView(conf.appwriteBuckedID, fileId);
}

}

const service = new Service();
export default service;
