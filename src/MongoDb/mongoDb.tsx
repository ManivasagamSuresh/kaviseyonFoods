import { MongoClient, Db } from "mongodb";

const url = process.env.MONGODB_URL;
const mongoclient = new MongoClient(url);

let db: Db | null = null;
let connection: MongoClient | null = null;

export const DBconnect = async (): Promise<Db | null> => {
  try {
    connection = await mongoclient.connect();
    db = await connection.db("kaviseyonfoods");
    console.log("db connected no issue");
    return db;
  } catch (error) {
    console.error("DB Connection Error:", error);
    return null;
  }
};

export const closeConnection = async (): Promise<void> => {
  if (connection) {
    await connection.close();
    connection = null;
    db = null;
  }
};

export { db, connection };
