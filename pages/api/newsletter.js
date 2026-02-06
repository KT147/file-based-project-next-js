
import { connectDatabase, insertDocument } from "../../helpers/db-util";



export default async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "Connecting to the database failed" });
      return;
    }
    try {
      await insertDocument(client, "newsletter", { email: email });
      client.close();
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed" });
      return;
    }

    console.log(email);
    return res.status(201).json({ message: "Signed up!" });
  }
}
