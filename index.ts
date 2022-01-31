// import { Express } from "express";
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.mongoPassword);
const username = "martinez";
const password = "pedromarmol"
const password2 = process.env.MONGOPASSWORD
console.log(process.env.mongoClient)
const uri = `mongodb+srv://${username}:${password}@clientdata.dluae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
client.connect((err: any) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
  if(err){
      console.log("error =>",err)
  } else {
      console.log(collection, "")
  }
});
