import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-util";

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: "Connecting to the database failed" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      console.log(result);
      newComment._id = result.insertedId;

      return res.status(201).json({ message: "Success", newComment });
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "comments",
        { eventId },
        { _id: -1 }
      );
      return res.status(201).json({ message: "Success", comments: documents });
    } catch (err) {
      res.status(500).json({ message: "Getting comments failed" });
    }
  }
  client.close();
}
