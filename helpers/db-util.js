import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://kevinkirjutabkoodi_db_user:gPQwyzLmlwnH3GtL@cluster0.nmb4uc9.mongodb.net/events?appName=Cluster0"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, find, sort) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(find)
    .sort(sort)
    .toArray();

    return documents;
}
