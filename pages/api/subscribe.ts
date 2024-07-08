import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = JSON.parse(req.body);

  // Check email validation
  if (!email || !email?.includes("@")) {
    res.status(422).json({
      message: "Invalid Email address",
    });
    return;
  }

  // Connection with database
  const client = await connectToDatabase();
  const db = client.db("ecom");

  // Check if email is already exist
  const existingEmail = await db
    .collection("subscribers")
    .findOne({ email: email });
  if (existingEmail) {
    res.status(422).json({ message: "Already Subscribed!" });
    client.close();
    return;
  }

  // Insert email in subscribers collection
  db.collection("subscribers").insertOne({
    email: email,
  });

  // Send the success response
  res.status(201).json({ message: "Successfully Subscribed!" });
}

export default handler;
