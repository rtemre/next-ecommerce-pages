import { MongoClient } from "mongodb";
export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://dbUser:dbPassword@cluster0.dcaaf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  return client;
}
