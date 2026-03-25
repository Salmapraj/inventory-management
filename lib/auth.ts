import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb"; // your mongodb client

const client =new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URL as string); // connect to your mongodb using the url from env
const db=client.db(); // get the database instance

export const auth = betterAuth({
  database: mongodbAdapter(db,{
client
  }),
  emailAndPassword:{
    enabled:true,
  },
socialProviders:{
  google:{
    clientId:"",
    clientSecret:""
  }
}
});
